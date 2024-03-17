%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
module EventsQuery = %relay(`
  query EventsQuery($after: String, $first: Int, $before: String) {
    __id
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
type loaderData = EventsQuery_graphql.queryRef;
@module("react-router-dom")
external useLoaderData: unit => Localized.data<loaderData> = "useLoaderData"

@genType @react.component
let make = () => {
  //let { fragmentRefs } = Fragment.use(events)
  let query = useLoaderData()
  let {__id, fragmentRefs} = EventsQuery.usePreloaded(~queryRef=query.data)

  <Localized>
    <div className="bg-white">
      <h1> {%raw("t`All Events`")} </h1>
      <div
        className={Util.cx([
          "grid",
          "grid-cols-1",
          "gap-y-10",
          "sm:grid-cols-2",
          "gap-x-6",
          "lg:grid-cols-3",
          "xl:gap-x-8",
        ])}
      />
      <EventsList events=fragmentRefs />
    </div>
  </Localized>
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
  let messages = switch lang {
  | "jp" => Lingui.import("../../locales/src/components/pages/Events/jp")
  | _ => Lingui.import("../../locales/src/components/pages/Events/en")
  }->Promise.thenResolve(messages => Lingui.i18n.load(lang, messages["messages"]))
  [messages]
}
@genType
let loader = ({?context, params, request}: LoaderArgs.t) => {
  let url = request.url->Router.URL.make
  let after = url.searchParams->Router.SearchParams.get("after")
  let before = url.searchParams->Router.SearchParams.get("before")

  Router.defer({
    Localized.data: Option.map(RelayEnv.getRelayEnv(context, RelaySSRUtils.ssr), env =>
      EventsQuery_graphql.load(
        ~environment=env,
        ~variables={?after, ?before},
        ~fetchPolicy=RescriptRelay.StoreOrNetwork,
      )
    ),
    i18nLoaders: Localized.loadMessages(params.lang, loadMessages),
  })
}
