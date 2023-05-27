import type { LinguiConfig } from "@lingui/conf"

const config: LinguiConfig = {
  locales: ["en", "jp"],
  catalogs: [{
    path: "src/locales/{locale}/messages",
    include: ["src"]
  }],
}

export default config
