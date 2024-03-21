%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t, plural } from '@lingui/macro'")
open Lingui.Util;

module Fragment = %relay(`
  fragment EventRsvps_event on Event
  @argumentDefinitions (
    after: { type: "String" }
    before: { type: "String" }
    first: { type: "Int", defaultValue: 20 }
  )
  @refetchable(queryName: "EventRsvpsRefetchQuery")
  {
  __id
    rsvps(after: $after, first: $first, before: $before)
    @connection(key: "EventRsvps_event_rsvps")
    {
      edges {
        node {
          user {
            id
            ...EventRsvpUser_user
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
		}
  }
`)
module EventRsvpsJoinMutation = %relay(`
 mutation EventRsvpsJoinMutation(
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
module EventRsvpsLeaveMutation = %relay(`
 mutation EventRsvpsLeaveMutation(
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

@module("../layouts/appContext")
external sessionContext: React.Context.t<UserProvider.session> = "SessionContext"
//@genType
//let default = make
@genType @react.component
let make = (~event) => {
  let {i18n} = Lingui.useLingui()

  let (_isPending, startTransition) = ReactExperimental.useTransition()
  let {
    data,
    loadNext,
    isLoadingNext,
    hasNext,
    hasPrevious,
    isLoadingPrevious,
  } = Fragment.usePagination(event)
  let rsvps = data.rsvps->Fragment.getConnectionNodes

  // let pageInfo = data.rsvps->Option.map(e => e.pageInfo)
  // let hasPrevious = pageInfo->Option.map(e => e.hasPreviousPage)->Option.getOr(false)
  let onLoadMore = _ =>
    startTransition(() => {
      loadNext(~count=1)->ignore
    })

  let {__id, id} = Fragment.use(event)
  let (commitMutationLeave, isMutationInFlight) = EventRsvpsLeaveMutation.use()
  let (commitMutationJoin, isMutationInFlight) = EventRsvpsJoinMutation.use()
  let session = React.useContext(sessionContext)
  let viewer = session.viewer
  let viewerHasRsvp =
    viewer
    ->Option.flatMap(viewer =>
      rsvps
      ->Array.find(edge =>
        edge.user->Option.map(user => user.id == viewer.user.id)->Option.getOr(false)
      )
      ->Option.map(_ => true)
    )
    ->Option.getOr(false)

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
        id: __id->RescriptRelay.dataIdToString,
        connections: [connectionId],
      },
    )->RescriptRelay.Disposable.ignore
  }
  <div
    className={Util.cx([
      "grid",
      "grid-cols-1",
      "xl:gap-x-8",
      // "gap-y-10",
      // "gap-x-6",
    ])}>
    <h2 className="mt-2 text-xl">
      {(rsvps->Array.length->Int.toString ++ " ")->React.string}
      {plural(rsvps->Array.length, { one: "player", other: "players"})}
    </h2>
    {<>
      <ul className="mt-2 mb-2">
        <FramerMotion.AnimatePresence>
          {switch rsvps {
          | [] => t`no players yet`
          | rsvps =>
            rsvps
            ->Array.map(edge => {
              edge.user
              ->Option.map(user =>
                <FramerMotion.Li
                  className=""
                  style={originX: 0.05, originY: 0.05}
                  key={user.id}
                  initial={opacity: 0., scale: 1.15}
                  animate={opacity: 1., scale: 1.}
                  exit={opacity: 0., scale: 1.15}>
                  <EventRsvpUser
                    user={user.fragmentRefs}
                    highlight={viewer
                    ->Option.map(viewer => viewer.user.id == user.id)
                    ->Option.getOr(false)}
                  />
                </FramerMotion.Li>
              )
              ->Option.getOr(React.null)
            })
            ->React.array
          }}
        </FramerMotion.AnimatePresence>
        <FramerMotion.Li
          className=""
          style={originX: 0.05, originY: 0.05}
          key="viewer"
          initial={opacity: 0., scale: 1.15}
          animate={opacity: 1., scale: 1.}
          exit={opacity: 0., scale: 1.15}>
          <ViewerRsvpStatus onJoin onLeave joined={viewerHasRsvp} />
        </FramerMotion.Li>
      </ul>
      <em>
        {isLoadingNext
          ? React.string("...")
          : hasNext
          ? <a onClick={onLoadMore}> {t`load More`} </a>
          : React.null}
      </em>
    </>}
  </div>
}

// let loadMessages = lang => {
//   let messages = switch lang {
//   | "ja" => Lingui.import("../../locales/ja/organisms/EventRsvps.mjs")
//   | _ => Lingui.import("../../locales/en/organisms/EventRsvps.mjs")
//   }->Promise.thenResolve(messages => Lingui.i18n.load(lang, messages["messages"]))
//
//   [messages]->Array.concat(ViewerRsvpStatus.loadMessages(lang))
// }

@genType
let default = make
