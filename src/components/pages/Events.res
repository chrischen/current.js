%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
open Lingui.Util

module EventsQuery = %relay(`
  query EventsQuery($after: String, $first: Int, $before: String) {
    ... EventsListFragment @arguments(after: $after, first: $first, before: $before)
  }
`)
/* module Fragment = %relay(`
  fragment Events_event on Event {
    ... Event_event
  }
`)*/
/* module Query = %relay(`
  query EventQuery {
    event(id: "1") {
      title
			... EventRsvps_event
		}
  }
`)*/
type loaderData = EventsQuery_graphql.queryRef
@module("react-router-dom")
external useLoaderData: unit => WaitForMessages.data<loaderData> = "useLoaderData"

@genType @react.component
let make = () => {
  //let { fragmentRefs } = Fragment.use(events)
  let query = useLoaderData()
  let {fragmentRefs} = EventsQuery.usePreloaded(~queryRef=query.data)

  <WaitForMessages>
    {() => {
      <>
        <PageTitle> {t`all events`} </PageTitle>
        <React.Suspense fallback={"Loading events..."->React.string}>
          <EventsList events=fragmentRefs />
        </React.Suspense>
      </>
    }}
  </WaitForMessages>
}

@genType
let default = make

@genType
let \"Component" = make

type params = {...EventsQuery_graphql.Types.variables, lang: option<string>}
module LoaderArgs = {
  type t = {
    context?: RelayEnv.context,
    params: params,
    request: Router.RouterRequest.t,
  }
}

let loadMessages = lang => {
  let messages =
    switch lang {
    | "ja" => Lingui.import("../../locales/src/components/pages/Events/ja")
    | _ => Lingui.import("../../locales/src/components/pages/Events/en")
    }
    ->Promise.thenResolve(messages =>
      Util.startTransition(() => Lingui.i18n.load(lang, messages["messages"]))
    )
    // Debug code to delay client message bundle loading
    // ->Promise.then(messages =>
    //   Promise.make((resolve, _) =>
    //     setTimeout(
    //       _ => {
    //         Js.log("Events Messages Load")
    //         Util.startTransition(() => Lingui.i18n.load(lang, messages["messages"]))
    //         resolve()
    //       },
    //       RelaySSRUtils.ssr ? 0 : 3000,
    //     )->ignore
    //   )
    // )
  [messages]
}
@genType
let loader = async ({?context, params, request}: LoaderArgs.t) => {
  let url = request.url->Router.URL.make
  let after = url.searchParams->Router.SearchParams.get("after")
  let before = url.searchParams->Router.SearchParams.get("before")
  Js.log("Loader is run")

  // await Promise.make((resolve, _) => setTimeout(_ => {Js.log("Delay loader");resolve()}, 200)->ignore)
  (RelaySSRUtils.ssr ? Some(await Localized.loadMessages(params.lang, loadMessages)) : None)->ignore
  {
    WaitForMessages.data: Option.map(RelayEnv.getRelayEnv(context, RelaySSRUtils.ssr), env =>
      EventsQuery_graphql.load(
        ~environment=env,
        ~variables={?after, ?before},
        ~fetchPolicy=RescriptRelay.StoreOrNetwork,
      )
    ),
    // i18nLoaders: Localized.loadMessages(params.lang, loadMessages),
    // i18nData: !RelaySSRUtils.ssr ? await Localized.loadMessages(params.lang, loadMessages) : %raw("[]"),
    i18nLoaders: ?(
      RelaySSRUtils.ssr ? None : Some(Localized.loadMessages(params.lang, loadMessages))
    ),
  }
}
@genType
let \"HydrateFallbackElement" =
  <div> {React.string("Loading fallback...")} </div>

// %raw("loade;.hydrate = true")
