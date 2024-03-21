%%raw("import { css, cx } from '@linaria/core'")
// %%raw(`import { I18nProvider } from "@lingui/react"`)
// %%raw("import { t } from '@lingui/macro'")

// @module("../locales/ja/messages")
module RouteParams = {
  type t = {lang: option<string>, locale: option<string>}

  let parse = (json: Js.Json.t): result<t, string> => {
    open JsonCombinators.Json.Decode

    let decoder = object(field => {
      lang: field.optional("lang", string),
      locale: field.optional("locale", string),
    })
    try {
      json->JsonCombinators.Json.decode(decoder)
    } catch {
    | _ => Error("An unexpected error occurred when checking the id.")
    }
  }
}

type locale = {
  locale: string,
  lang: string
}
@module("react-router-dom")
external useLoaderData: unit => locale = "useLoaderData"
@genType @react.component
let make = () => {
  let { locale, lang } = useLoaderData()
  open Router

  <React.Suspense fallback={"Loading language"->React.string}>
    <Lingui.I18nProvider i18n=Lingui.i18n>
      <ReactIntl.IntlProvider locale=lang>
        <Outlet />
      </ReactIntl.IntlProvider>
    </Lingui.I18nProvider>
  </React.Suspense>
}

@genType
let default = make

@genType
let \"Component" = make

module LoaderArgs = {
  type t = {
    context?: RelayEnv.context,
    params: RouteParams.t,
    request: Router.RouterRequest.t,
  }
}

@val external importLang: 'a => Js.Promise.t<{"messages": Lingui.Messages.t}> = "import"

@genType
let loader = ({?context, params, request}: LoaderArgs.t) => {
  let url = request.url->Router.URL.make
  let lang = params.lang->Option.getOr("en")
  let locale = switch(lang) {
    | "ja" => "jp"
    | _ => "us"
  };

  // Lingui.i18n.activate(lang)
  {
    locale, lang
  }
}
