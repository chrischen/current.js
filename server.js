import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isTest = process.env.VITEST;

process.env.MY_CUSTOM_SECRET = "API_KEY_qwertyuiop";

const cssCache = {};
let compiledCss;
let enableCriticalCss = false;

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production",
  hmrPort
) {
  const resolve = (p) => path.resolve(__dirname, p);

  const indexProd = isProd
    ? fs.readFileSync(resolve("dist/client/index.html"), "utf-8")
    : "";

  const app = express();

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;
  if (!isProd) {
    vite = await (
      await import("vite")
    ).createServer({
      root,
      logLevel: isTest ? "error" : "info",
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: "custom",
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use((await import("compression")).default());
    app.use(
      (await import("serve-static")).default(resolve("dist/client"), {
        index: false,
      })
    );

    if (enableCriticalCss)
      compiledCss = fs.readFileSync(
        "./dist/client/assets/" +
        fs
          .readdirSync("./dist/client/assets")
          .filter((fn) => fn.includes("index") && fn.endsWith(".css"))[0],
        "utf8"
      );

    // Cached CSS from Linaria
    app.get("/styles/:slug", (req, res) => {
      res.type("text/css");
      res.end(cssCache[req.params.slug]);
    });
  }
  // loading render function needs to be moved out of the request handler due
  // to unknown bug with ssrLoadModule if it gets called again (such as on
  // page reload)
  // @ts-ignore

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      let template;
      let render;
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry/server.tsx")).render;
      } else {
        template = indexProd;
        render = (await import("./dist/server/server.js")).render;
      }

      const head = template.match(/<head>(.+?)<\/head>/s)[1];

      let bootstrap;
      if (isProd)
        bootstrap =
          "/assets/" +
          fs
            .readdirSync("./dist/client/assets")
            .filter((fn) => fn.includes("index") && fn.endsWith(".js"))[0];
      else bootstrap = "/src/entry/client.tsx";

      const context = {};
      const criticalCss = render(req, res, url, bootstrap, head, compiledCss);

      if (criticalCss) {
        // Cache the non-critical CSS for serving
        cssCache[criticalCss.slug] = criticalCss.other;
      }

      // @TODO: React router changed how context/redirect is done
      // ...
      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        return res.redirect(301, context.url);
      }
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app, vite }) =>
    app.listen(5173, () => {
      console.log("http://localhost:5173");
    })
  );
}
