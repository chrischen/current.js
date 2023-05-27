import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import linaria from "@linaria/vite";
import { lingui } from "@lingui/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
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
        ]
      ]
    }),
    linaria(),
    lingui(),
  ],
});
