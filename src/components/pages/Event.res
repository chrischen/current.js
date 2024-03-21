%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
open Lingui.Util;

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
      errors {
        message
      }
    }
  }
`)

// module Fragment = %relay(`
//   fragment Event_event on Event {
//     title
//     ... EventRsvps_event
//   }
// `)

type loaderData = EventQuery_graphql.queryRef
@module("react-router-dom")
external useLoaderData: unit => Localized.data<loaderData> = "useLoaderData"

@module("../layouts/appContext")
external sessionContext: React.Context.t<UserProvider.session> = "SessionContext"
@genType @react.component
let make = () => {
  let query = useLoaderData()
  let {event} = EventQuery.usePreloaded(~queryRef=query.data)

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

    <Localized>
      <Grid className="grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-3">
        <PageTitle>
          {t`event: `}
          {React.string(" ")}
          {title->Option.map(React.string)->Option.getOr(React.null)}
        </PageTitle>
        <p className="mt-4 lg:text-xl leading-8 text-gray-700">
          {"Description of the event goes here. Special rules, procedures, etc."->React.string}
        </p>
        </div>
        // <ViewerRsvpStatus onJoin onLeave joined=true />
        <EventRsvps event=fragmentRefs />
      </Grid>
    </Localized>
  })
  ->Option.getOr(<div> {React.string("Event Doesn't Exist")} </div>)
}

@genType
let default = make

@genType
let \"Component" = make

type params = {
  ...EventQuery_graphql.Types.variables,
  lang: option<string>,
}
module LoaderArgs = {
  type t = {
    context?: RelayEnv.context,
    params: params,
    request: Router.RouterRequest.t,
  }
}

let loadMessages = lang => {
  let messages = switch lang {
  | "ja" => Lingui.import("../../locales/src/components/pages/Event/ja")
  | _ => Lingui.import("../../locales/src/components/pages/Event/en")
  }->Promise.thenResolve(messages => Lingui.i18n.load(lang, messages["messages"]))
  [messages]
  // ->Array.concat(EventRsvps.loadMessages(lang))
  // ->Array.concat(ViewerRsvpStatus.loadMessages(lang))
}

@genType
let loader = ({?context, params, request}: LoaderArgs.t) => {
  let url = request.url->Router.URL.make

  let lang = params.lang->Option.getOr("en")

  let after = url.searchParams->Router.SearchParams.get("after")
  let before = url.searchParams->Router.SearchParams.get("before")

  Router.defer({
    Localized.data: Option.map(RelayEnv.getRelayEnv(context, RelaySSRUtils.ssr), env =>
      EventQuery_graphql.load(
        ~environment=env,
        ~variables={eventId: params.eventId, ?after, ?before, first: 20},
        ~fetchPolicy=RescriptRelay.StoreOrNetwork,
      )
    ),
    i18nLoaders: Localized.loadMessages(params.lang, loadMessages),
  })
}
