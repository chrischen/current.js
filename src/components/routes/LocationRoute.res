@genType
let \"Component" = LocationPage.make

type params = {locationId: string, lang: option<string>}
module LoaderArgs = {
  type t = {
    context?: RelayEnv.context,
    params: params,
    request: Router.RouterRequest.t,
  }
}

let loadMessages = lang => {
  let messages = switch lang {
  | "ja" => Lingui.import("../../locales/src/components/pages/LocationPage.re/ja")
  | _ => Lingui.import("../../locales/src/components/pages/LocationPage.re/en")
  }->Promise.thenResolve(messages =>
    Util.startTransition(() => Lingui.i18n.load(lang, messages["messages"]))
  )

  [messages]
}

@genType
let loader = async ({?context, params}: LoaderArgs.t) => {
  let query =
    Option.map(RelayEnv.getRelayEnv(context, RelaySSRUtils.ssr), env =>
      LocationPageQuery_graphql.load(
        ~environment=env,
        ~variables={id: params.locationId, filters: {locationId: params.locationId}},
        ~fetchPolicy=RescriptRelay.StoreOrNetwork,
      )
    )->Option.getExn
  (RelaySSRUtils.ssr ? Some(await Localized.loadMessages(params.lang, loadMessages)) : None)->ignore
  Router.defer({
    WaitForMessages.data: query,
    // Localized.i18nLoaders: Localized.loadMessages(params.lang, loadMessages),
    i18nLoaders: ?(
      RelaySSRUtils.ssr ? None : Some(Localized.loadMessages(params.lang, loadMessages))
    ),
  })
}
