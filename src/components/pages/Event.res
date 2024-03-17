%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
// %%raw("import { I18nProvider } from '@lingui/react'")
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

type loaderData = EventQuery_graphql.queryRef;
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
        <div className="bg-white">
          <h1>
            {%raw("t`Event:`")}
            {React.string(" ")}
            {title->Option.map(React.string)->Option.getOr(React.null)}
          </h1>
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
  // | "jp" => Lingui.import("../../locales/jp/pages/Event.mjs")
  // | _ => Lingui.import("../../locales/en/pages/Event.mjs")
  | "jp" => Lingui.import("../../locales/src/components/pages/Event/jp")
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

  let messages = Js.Promise.all(loadMessages(lang))

  // let messages = allMsgs->Promise.then(((msgs1, msgs2)) => {
  //   // Lingui.i18n.activate(lang)
  //   Promise.resolve("")
  // })

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
    i18nLoaders: Localized.loadMessages(params.lang, loadMessages)
  })
}
