import React from "react";
import type { ReactNode } from "react";
import ReactDOMServer from "react-dom/server";
import type { StaticHandlerContext } from "react-router-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
} from "react-router-dom/server";
import { matchRoutes } from "react-router-dom";
import type { Request, Response } from "express";
import type { HelmetData, HelmetServerState } from "react-helmet-async";
import isbot from "isbot";
import parse from "html-react-parser";
import { HelmetProvider } from "react-helmet-async";
// import { collect } from "@linaria/server";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { RelayEnvironmentProvider } from "react-relay";
import { makeServer } from './RelayEnv.mjs';
import Html, { Head } from "./Html";
import { messages } from "../locales/jp/messages";
import PreloadInsertingStreamNode from "../../server/PreloadInsertingStreamNode";
import { createFetchRequest } from "./fetch";
import { routes, Wrapper } from "../routes";

i18n.load("jp", messages);
i18n.activate("jp");

interface CriticalCss {
  critical: string;
  other: string;
  slug: string;
}
export interface HtmlProps {
  blockingCss?: string;
  helmet: HelmetData;
  html: string;
  root: React.ReactElement;
  scripts: string[];
  muiStyles?: Array<React.ReactElement>;
  window?: {
    [key: string]: object;
  };
}

const prependSlash = (s: string) => '/' + s;

const getHtml = (
  helmetContext: { helmet?: HelmetServerState },
  headTags?: string,
  blockingCss?: string[],
  preload?: string[],
  scripts?: string[]
): [string, string] => {
  let viteTags: ReactNode;
  if (import.meta.env.DEV && headTags) {
    viteTags = parse(headTags);
  } else if (headTags) {
    headTags = headTags.replace(/<script [^>]*><\/script>/s, "");

    viteTags = parse(headTags);
  }

  const html = (
    <Html
      head={
        <Head helmet={helmetContext.helmet}>
          {blockingCss
            ? blockingCss.map((src) => <link rel="stylesheet" href={src} />)
            : null}
          {viteTags}
          {preload?.map((href) => {
            return <link rel="modulepreload" href={href} />;
          })}
          {scripts?.map((script) => {
            return <script type="module" src={script} async />;
          })}
        </Head>
      }
    ></Html>
  );
  const htmlStr = ReactDOMServer.renderToStaticMarkup(html).split(
    '<div id="root">',
    2
  );
  return [htmlStr[0] + '<div id="root">', htmlStr[1]];
};
function getChunk(
  manifest: Manifest,
  key: keyof typeof manifest
): ManifestEntry {
  return manifest[key];
}

/* React Router */
const handler = createStaticHandler(routes);

interface ManifestEntry {
  file: string;
  src: string;
  isEntry?: boolean;
  isDynamicEntry?: boolean;
  css?: string[];
  assets?: string[];
  imports?: string[];
  dynamicImports?: string[];
}
interface Manifest {
  [key: string]: ManifestEntry;
}
export async function render(
  req: Request,
  res: Response,
  url: string,
  bootstrap: string,
  viteHead?: string,
  manifest?: Manifest
): Promise<CriticalCss | undefined | void> {
  // Relay store and environment should be recreated for each request
  // const store = createStore();
  // const environment = createEnvironment({ configName: "server", store });

  // Overwride web server output stream to inject additional data to React
  // output
  const transformStream = new PreloadInsertingStreamNode(res);
  // Set the Relay store to be used in the stream class
  // transformStream.setStore(store);
  transformStream.on("finish", () => {
    res.end();
  });

  const environment = makeServer(transformStream.onQuery.bind(transformStream));
  /* React Router */
  const fetchRequest = createFetchRequest(req);
  const context = await handler.query(fetchRequest, {
    requestContext: {
      environment,
    },
  });

  if (
    context instanceof Response &&
    [301, 302, 303, 307, 308].includes(context.status)
  ) {
    const loc = context.headers.get("Location");
    return res.redirect(context.status, loc ?? "/");
  }

  const router = createStaticRouter(
    handler.dataRoutes,
    context as StaticHandlerContext
  );

  const route = matchRoutes(routes, url);
  let css: string[] = [];
  let scripts: string[] = [];
  let preloadScripts: string[] = [];
  // let preload: string[] = [];
  if (manifest && route) {
    const indexChunk = manifest["index.html"];
    const chunk = manifest[route[0].route.handle];
    css = indexChunk.css ?? [];
    if (chunk) {
      // Add CSS from current chunk
      css = css.concat(chunk.css ?? []);
      // Add CSS from chunks imported by current chunk
      css = css.concat(
        chunk.imports?.flatMap((key) => getChunk(manifest, key).css || []) ?? []
      );
    }

    bootstrap = indexChunk.file;
    if (chunk) {
      // Add current chunk
      preloadScripts = [chunk.file];
      // Add scripts imported by current chunk
      preloadScripts = preloadScripts.concat(
        chunk.imports?.map((key) => getChunk(manifest, key).file) ?? []
      );
      // Because not all browsers support modulepreload...
      scripts = preloadScripts;
    }
  } else if (route) {
    preloadScripts = [route[0].route.handle];
  }

  const streaming = !isbot(req.header("User-Agent"));
  let didError = false;

  let cachedHtml: [string, string];

  const helmetContext: { helmet: HelmetServerState | undefined } = {
    helmet: undefined,
  };
  const app = (
    <React.StrictMode>
      <RelayEnvironmentProvider environment={environment}>
        <I18nProvider i18n={i18n}>
          <HelmetProvider context={helmetContext}>
            <Wrapper
              router={router}
              context={context as StaticHandlerContext}
            />
          </HelmetProvider>
        </I18nProvider>
      </RelayEnvironmentProvider>
    </React.StrictMode>
  );

  const stream = ReactDOMServer.renderToPipeableStream(app, {
    bootstrapModules: [...scripts, bootstrap].map(prependSlash),
    bootstrapScriptContent: "window.__READY_TO_BOOT ? window.__BOOT() : (window.__READY_TO_BOOT = true)",
    // bootstrapScriptContent: streaming ? `window.__GRAPHQL_STATE__ = ${JSON.stringify(
    //   store.getSource().toJSON()
    // )}` : '',
    onShellReady() {
      // The content above all Suspense boundaries is ready.
      // If something errored before we started streaming, we set the error code appropriately.
      // Set the return type to `text/html`, and dump the response back to
      // the client

      res.statusCode = didError ? 500 : 200;
      res.setHeader("Content-type", "text/html");

      cachedHtml = getHtml(helmetContext, viteHead, css.map(prependSlash), preloadScripts.map(prependSlash), []);

      res.write(cachedHtml[0]);
      if (streaming) {
        stream.pipe(transformStream);
        transformStream.write(cachedHtml[1]);
      }
    },
    // onShellError(_error) {
    //   // Something errored before we could complete the shell so we emit an alternative shell.
    //   // @TODO: This gives a write after end error
    //   res.statusCode = 500;
    //   res.send(
    //     '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
    //   );
    // },
    onAllReady() {
      // If you don't want streaming, use this instead of onShellReady.
      // This will fire after the entire page content is ready.
      // You can use this for crawlers or static generation.
      // res.statusCode = didError ? 500 : 200;
      // res.setHeader('Content-type', 'text/html');

      if (!streaming) {
        stream.pipe(transformStream);
        // Close the HTML tags
        res.write(cachedHtml[1]);
      }
    },
    onError(err) {
      didError = true;
      console.error(err);
    },
  });

  return { critical: "", other: "", slug: "" };
}
