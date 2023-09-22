import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import linaria from "@linaria/vite";
import { lingui } from "@lingui/vite-plugin";
import relay from "vite-plugin-relay-lite";
import { splitVendorChunkPlugin } from "vite";
import { compression } from 'vite-plugin-compression2'
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/

/*
// Babel based setup
export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ["relay", "macros"] },
    }),
    linaria(),
    lingui(),
  ],
}); */
export default defineConfig({
  // base: "https://static0.instapainting.com/",
  ssr: {
    // target: 'node',
    noExternal: process.env.NODE_ENV === "production" ? ["react-relay"] : [], // @NOTE: This option breaks SSR dev server
    optimizeDeps: {
      include: ["rescript-relay", "react-relay"],
    },
  },
  build: {
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      output: {
        format: "esm",
        /* manualChunks: {
          react: ["react", "react-dom"],
          relay: ["react-relay", "relay-runtime"],
        }, */
      },
      plugins: [visualizer({ open: false })],
    },
  },
  plugins: [
    splitVendorChunkPlugin(),
    react({
      plugins: [
        [
          "@lingui/swc-plugin",
          {
            /* runtimeModules: {
              i18n: ["@lingui/core", "i18n"],
              trans: ["@lingui/react", "Trans"],
            }, */
          },
        ],
      ],
    }),
    linaria(),
    lingui(),
    relay(),
    /* visualizer({
      template: "treemap", // or sunburst
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: "bundle.html", // will be saved in project's root
      sourcemap: false
    }), */
    /* Not strictly necessary as CDN deployment will compress static assets. */
    process.env.NODE_ENV === 'production' ? compression({ algorithm: 'brotliCompress', exclude: [/\.(br)$/, /\.(gz)$/], deleteOriginalAssets: false }) : undefined,
    // compression({ algorithm: 'gzip', exclude: [/\.(br)$/, /\.(gz)$/], deleteOriginalAssets: false }),
  ],
  resolve: {
    // extensions: [".js", ".mjs", ".tsx", ".ts", ".jsx"],
  },
});
