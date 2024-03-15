%%raw("import { css, cx } from '@linaria/core'")
// %%raw(`import { I18nProvider } from "@lingui/react"`)
// %%raw("import { t } from '@lingui/macro'")

// @module("react-router-dom")
// external useLoaderData: unit => {"messages": Js.Promise.t<string>} = "useLoaderData"

@module("../locales/jp/messages")
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

@genType @react.component
let make = () => {
  // let data = useLoaderData()
  open Router
  let navigate = useNavigate()
  let paramsJs = useParams()
  let location = useLocation()
  let {locale, lang} =
    paramsJs->RouteParams.parse->Belt.Result.getWithDefault({lang: None, locale: None})

  // React.useEffect1(() => {
  //   switch lang {
  //   | Some("en") | Some("jp") => ()
  //   | _ => navigate("/en" ++ location.pathname, Some({replace: true}))
  //   }
  //
  //   Some(() => ())
  // }, [lang])

  // Js.log("Lang")
  // Js.log(lang->Option.getOr("en"))
  // Js.log(data)

  <React.Suspense fallback={"Loading"->React.string}>
      <Lingui.I18nProvider i18n=Lingui.i18n>
        <Outlet />
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
  Lingui.i18n.activate(lang)
  Js.Null.Null
}
