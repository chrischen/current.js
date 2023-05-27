import React from "react";
import type { ReactNode } from "react";
import crypto from "crypto";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import type { Request, Response } from "express";
import type { HelmetData, HelmetServerState } from "react-helmet-async";
import isbot from "isbot";
import parse from "html-react-parser";
import { HelmetProvider } from "react-helmet-async";
import { collect } from "@linaria/server";
import relay from "react-relay";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import environment, { store } from "./RelayEnvironment";
import App from "../App";
import Html, { Head } from "./Html";
import { messages } from "../locales/jp/messages.po";

i18n.load("jp", messages);
i18n.activate("jp");

interface CriticalCss {
  critical: string;
  other: string;
  slug: string;
}
const { RelayEnvironmentProvider } = relay;
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
const getHtml = (
  helmetContext: { helmet?: HelmetServerState },
  headTags?: string,
  criticalCss?: CriticalCss
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
          {viteTags}
          {criticalCss && (
            <style
              type="text/css"
              dangerouslySetInnerHTML={{ __html: criticalCss.critical }}
            ></style>
          )}
        </Head>
      }
      end={
        criticalCss && <link rel="css" href={`/styles/${criticalCss.slug}`} />
      }
    ></Html>
  );
  const htmlStr = ReactDOMServer.renderToStaticMarkup(html).split(
    '<div id="root">',
    2
  );
  return [htmlStr[0] + '<div id="root">', htmlStr[1]];
};

export function render(
  req: Request,
  res: Response,
  url: string,
  bootstrap: string,
  viteHead?: string,
  compiledCss?: string
): CriticalCss | undefined {
  const helmetContext: { helmet: HelmetServerState | undefined } = {
    helmet: undefined,
  };
  const app = (
    <React.StrictMode>
      <RelayEnvironmentProvider environment={environment}>
        <I18nProvider i18n={i18n}>
          <HelmetProvider context={helmetContext}>
            <StaticRouter location={url}>
              <App />
            </StaticRouter>
          </HelmetProvider>
          {import.meta.env.SSR ? (
            <script
              type="text/javascript"
              id="graphql-state"
              dangerouslySetInnerHTML={{
                __html: `window.__GRAPHQL_STATE__ = ${JSON.stringify(
                  store.getSource().toJSON()
                )}`,
              }}
            />
          ) : null}
        </I18nProvider>
      </RelayEnvironmentProvider>
    </React.StrictMode>
  );

  const streaming = !isbot(req.header("User-Agent"));
  let didError = false;

  let cachedHtml: [string, string];

  let criticalCss: CriticalCss | undefined;

  if (compiledCss) {
    const tmpRender = ReactDOMServer.renderToString(app);
    const { critical, other } = collect(tmpRender, compiledCss);
    criticalCss = {
      critical,
      other,
      slug: crypto.createHash("md5").update(other).digest("hex"),
    };
  }

  const stream = ReactDOMServer.renderToPipeableStream(app, {
    bootstrapModules: [bootstrap],
    onShellReady() {
      // The content above all Suspense boundaries is ready.
      // If something errored before we started streaming, we set the error code appropriately.
      // Set the return type to `text/html`, and dump the response back to
      // the client

      res.statusCode = didError ? 500 : 200;
      res.setHeader("Content-type", "text/html");

      cachedHtml = getHtml(helmetContext, viteHead, criticalCss);

      res.write(cachedHtml[0]);
      if (streaming) {
        stream.pipe(res);
      }
    },
    onShellError(_error) {
      // Something errored before we could complete the shell so we emit an alternative shell.
      // @TODO: This gives a write after end error
      res.statusCode = 500;
      res.send(
        '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
      );
    },
    onAllReady() {
      // If you don't want streaming, use this instead of onShellReady.
      // This will fire after the entire page content is ready.
      // You can use this for crawlers or static generation.
      // res.statusCode = didError ? 500 : 200;
      // res.setHeader('Content-type', 'text/html');

      if (!streaming) {
        stream.pipe(res);
      }
      // Close the HTML tags
      res.write(cachedHtml[1]);
    },
    onError(err) {
      didError = true;
      console.error(err);
    },
  });

  return criticalCss;
}
