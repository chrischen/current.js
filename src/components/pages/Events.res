%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
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
@module("react-router-dom")
external useLoaderData: unit => EventsQuery_graphql.queryRef = "useLoaderData"

module MenuInstance = {
  @module("../ui/navigation-menu") @react.component
  external make: unit => React.element = "MenuInstance"
}

@genType @react.component
let make = () => {
  //let { fragmentRefs } = Fragment.use(events)
  let query = useLoaderData()
  let { fragmentRefs } = EventsQuery.usePreloaded(~queryRef=query)

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
    <MenuInstance />
    <EventsList events=fragmentRefs />
  </div>
}

@genType
let default = make

@genType
let \"Component" = make

module SearchParams = {
  type t;

  @send external get: (t, string) => option<string> = "get";
}
module URL = {
  type t = {
    searchParams: SearchParams.t,
  };

  @new external make: string => t = "URL";
}
module RouterRequest = {
  type t = {
    url: string,
  }
}
module LoaderArgs = {
  type t = {
    context?: RelayEnv.context,
    params: EventsQuery_graphql.Types.variables,
    request: RouterRequest.t
  }
}

@genType
let loader = ({?context, params, request}: LoaderArgs.t) => {
  Js.log(request.url);
  let url = request.url->URL.make
  let after = url.searchParams->SearchParams.get("after");
  let before = url.searchParams->SearchParams.get("before");
  Js.log(after);
  Option.map(RelayEnv.getRelayEnv(context, RelaySSRUtils.ssr), env =>
    EventsQuery_graphql.load(
      ~environment=env,
      ~variables={after: ?after, before: ?before, first: 2},
      ~fetchPolicy=RescriptRelay.StoreOrNetwork,
    )
  )
}
