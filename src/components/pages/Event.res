%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
module EventQuery = %relay(`
  query EventQuery($eventId: ID!, $after: String, $first: Int, $before: String) {
    event(id: $eventId) {
      __id
      title
      ...EventRsvps_event @arguments(after: $after, first: $first, before: $before)
    }
  }
`)

module EventJoinMutation = %relay(`
 mutation EventJoinMutation(
    $connections: [ID!]!
    $id: ID!
  ) {
    joinEvent(eventId: $id) {
      edge @appendEdge(connections: $connections) {
        node {
          id
          user {
            id
            lineUsername
          }
        }
      }
    }
  }
`)
module EventLeaveMutation = %relay(`
 mutation EventLeaveMutation(
    $connections: [ID!]!
    $id: ID!
  ) {
    leaveEvent(eventId: $id) {
      eventIds @deleteEdge(connections: $connections)
    }
  }
`)

// module Fragment = %relay(`
//   fragment Event_event on Event {
//     title
//     ... EventRsvps_event
//   }
// `)

@module("react-router-dom")
external useLoaderData: unit => EventQuery_graphql.queryRef = "useLoaderData"

@module("../layouts/appContext")
external sessionContext: React.Context.t<UserProvider.session> = "SessionContext"
@genType @react.component
let make = () => {
  let query = useLoaderData()
  let {event} = EventQuery.usePreloaded(~queryRef=query)

  let (commitMutationLeave, isMutationInFlight) = EventLeaveMutation.use()
  let (commitMutationJoin, isMutationInFlight) = EventJoinMutation.use()

  event
  ->Option.map(event => {
    let {__id, title, fragmentRefs} = event
    let onJoin = _ => {
      let connectionId = RescriptRelay.ConnectionHandler.getConnectionID(
        __id,
        "EventRsvps_event_rsvps",
        (),
      )
      commitMutationJoin(
        ~variables={
          id: __id->RescriptRelay.dataIdToString,
          connections: [connectionId],
        },
      )->RescriptRelay.Disposable.ignore
    }
    let onLeave = _ => {
      let connectionId = RescriptRelay.ConnectionHandler.getConnectionID(
        __id,
        "EventRsvps_event_rsvps",
        (),
      )
      commitMutationLeave(
        ~variables={
          id: event.__id->RescriptRelay.dataIdToString,
          connections: [connectionId],
        },
      )->RescriptRelay.Disposable.ignore
    }

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
      <ViewerRsvpStatus onJoin onLeave joined=true />
      <EventRsvps event=fragmentRefs />
    </div>
  })
  ->Option.getOr(<div> {React.string("Event Doesn't Exist")} </div>)
}

@genType
let default = make

@genType
let \"Component" = make

module LoaderArgs = {
  type t = {
    context?: RelayEnv.context,
    params: EventQuery_graphql.Types.variables,
    request: Router.RouterRequest.t,
  }
}
@genType
let loader = ({?context, params, request}: LoaderArgs.t) => {
  let url = request.url->Router.URL.make
  let after = url.searchParams->Router.SearchParams.get("after")
  let before = url.searchParams->Router.SearchParams.get("before")
  Option.map(RelayEnv.getRelayEnv(context, RelaySSRUtils.ssr), env =>
    EventQuery_graphql.load(
      ~environment=env,
      ~variables={eventId: params.eventId, ?after, ?before, first: 20},
      ~fetchPolicy=RescriptRelay.StoreOrNetwork,
    )
  )
}
