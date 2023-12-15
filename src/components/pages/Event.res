%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
module EventQuery = %relay(`
  query EventQuery($eventId: ID!) {
    event(id: $eventId) {
      title
      ...EventRsvps_event
    }
  }
`)
module Fragment = %relay(`
  fragment Event_event on Event {
    title
    ... EventRsvps_event
  }
`)

@module("react-router-dom")
external useLoaderData: unit => EventQuery_graphql.queryRef = "useLoaderData"

@genType @react.component
let make = () => {
  let query = useLoaderData()
  let {event} = EventQuery.usePreloaded(~queryRef=query)
  event->Option.map(({ title, fragmentRefs }) => 
  <div className="bg-white">
    <h1> {title->Option.map(React.string)->Option.getOr(React.null)} </h1>
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
    <EventRsvps users=fragmentRefs />
  </div>)->Option.getOr(<div> {React.string("Event Doesn't Exist")} </div>)
}

@genType
let default = make

@genType
let \"Component" = make

module LoaderArgs = {
  type t = {
    context?: RelayEnv.context,
    // params: {"eventId": string}},
    params: EventQuery_graphql.Types.variables,
  }
}
@genType
let loader = ({?context, params}: LoaderArgs.t) => {
  Option.map(RelayEnv.getRelayEnv(context, RelaySSRUtils.ssr), env =>
    EventQuery_graphql.load(
      ~environment=env,
      // ~variables={eventId: params["eventId"]},
      ~variables=params,
      ~fetchPolicy=RescriptRelay.StoreOrNetwork,
    )
  )
}
