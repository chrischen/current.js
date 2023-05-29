import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import linaria from "@linaria/vite";
import { lingui } from "@lingui/vite-plugin";
import relay from "vite-plugin-relay-lite";
// import commonjs from "vite-plugin-commonjs";

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
  ssr: {
    // target: 'node',
    noExternal: ["react-relay"] // @NOTE: This option breaks SSR dev server
  },
  plugins: [
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
  ],
});
