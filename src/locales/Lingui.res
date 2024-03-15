module Messages: {
  type t
  // let merge: (t, t) => t;

} = {
  type t = Js.Json.t;

  // let merge: (t, t) => t = %raw(`function(a, b) { return {...a, ...b}}`)
}
// type msgs = string
type t = {
  load: (string, Messages.t) => unit,
  activate: string => unit,
  locale: string
}
type lingui = {
  i18n: t
}
@module("@lingui/react")
external useLingui: unit => lingui = "useLingui"

type core = {
  i18n: t
}
// @module("@lingui/core")
// external linguiCore: core = "default"

@module("@lingui/core")
external i18n: t = "i18n"
let i18n = i18n

module I18nProvider = {
  @module("@lingui/react") @react.component
  // @react.component
  external make: (~i18n: t, ~children: React.element) => React.element = "I18nProvider"
}

@val external import: 'a => Js.Promise.t<{"messages": Messages.t}> = "import"
