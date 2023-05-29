import type { LinguiConfig } from "@lingui/conf"

const config: LinguiConfig = {
  locales: ["en", "jp"],
  compileNamespace: "ts",
  catalogs: [{
    path: "src/locales/{locale}/messages",
    include: ["src"]
  }],
}

export default config
