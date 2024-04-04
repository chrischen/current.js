type data<'a> = Promise('a) | Empty

let isEmptyObj: 'a => bool = %raw(
  "obj => Object.keys(obj).length === 0 && obj.constructor === Object"
)
let parseData: 'a => data<'a> = json => {
  if isEmptyObj(json) {
    Empty
  } else {
    Promise(json)
  }
}

@genType
let \"Component" = CreateEvent.make

type params = {lang: option<string>}
module LoaderArgs = {
  type t = {
    context?: RelayEnv.context,
    params: params,
    request: Router.RouterRequest.t,
  }
}
let loadMessages = lang => {
  let messages = switch lang {
  | "ja" => Lingui.import("../../locales/src/components/pages/CreateEvent/ja")
  | _ => Lingui.import("../../locales/src/components/pages/CreateEvent/en")
  }->Promise.thenResolve(messages =>
    Util.startTransition(() => Lingui.i18n.load(lang, messages["messages"]))
  )

  [messages]
  // ->Array.concat(EventRsvps.loadMessages(lang))
  // ->Array.concat(ViewerRsvpStatus.loadMessages(lang))
}

@genType
let loader = async ({params}: LoaderArgs.t) => {
  (RelaySSRUtils.ssr ? Some(await Localized.loadMessages(params.lang, loadMessages)) : None)->ignore
  Router.defer({
    WaitForMessages.data: None,
    // Localized.i18nLoaders: Localized.loadMessages(params.lang, loadMessages),
    i18nLoaders: ?(
      RelaySSRUtils.ssr ? None : Some(Localized.loadMessages(params.lang, loadMessages))
    ),

    // i18nData: ?(RelaySSRUtils.ssr ? Some(await Localized.loadMessages(params.lang, loadMessages)): None)
  })
  // If ASYNC on BOTH, server will send fallback and hydrates immediately
  // on client with same fallback
  //
  // IF AWAIT on client, client and loader is not ready by hydration, will render HydrateFallback which is never
  // rendered by SERVER, always causing hydration mismatch
  //
  // If hydrate=true, partialHydration feature works with AWAIT on client loader
  //
  //IF AWAIT on SERVER, ASYNC on CLIENT, server will block until loader is done to return result, client hydrates without triggering Suspense fallbacks
  //
}
// @genType
// let \"HydrateFallback" = <div> {React.string("Loading fallback...")} </div>
// %raw("loader.hydrate = true")
