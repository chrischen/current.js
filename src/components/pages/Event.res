%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
open Lingui.Util

module EventQuery = %relay(`
  query EventQuery($eventId: ID!, $after: String, $first: Int, $before: String) {
    event(id: $eventId) {
      __id
      title
      details
      startDate
      endDate
      location {
        id
        name
        ...EventLocation_location
      }
      ...EventRsvps_event @arguments(after: $after, first: $first, before: $before)
    }
  }
`)

// module EventJoinMutation = %relay(`
//  mutation EventJoinMutation(
//     $connections: [ID!]!
//     $id: ID!
//   ) {
//     joinEvent(eventId: $id) {
//       edge @appendEdge(connections: $connections) {
//         node {
//           id
//           user {
//             id
//             lineUsername
//           }
//         }
//       }
//     }
//   }
// `)
// module EventLeaveMutation = %relay(`
//  mutation EventLeaveMutation(
//     $connections: [ID!]!
//     $id: ID!
//   ) {
//     leaveEvent(eventId: $id) {
//       eventIds @deleteEdge(connections: $connections)
//       errors {
//         message
//       }
//     }
//   }
// `)

// module Fragment = %relay(`
//   fragment Event_event on Event {
//     title
//     ... EventRsvps_event
//   }
// `)

type loaderData = EventQuery_graphql.queryRef
@module("react-router-dom")
external useLoaderData: unit => WaitForMessages.data<loaderData> = "useLoaderData"

@module("../layouts/appContext")
external sessionContext: React.Context.t<UserProvider.session> = "SessionContext"
@genType @react.component
let make = () => {
  let query = useLoaderData()
  let {event} = EventQuery.usePreloaded(~queryRef=query.data)

  // let (commitMutationLeave, _isMutationInFlight) = EventLeaveMutation.use()
  // let (commitMutationJoin, _isMutationInFlight) = EventJoinMutation.use()

  event
  ->Option.map(event => {
    let {__id, title, details, location, fragmentRefs} = event

    // let startDate =
    //   event.startDate->Option.getOr(
    //     "1900-05-05T00:00"->DateFns.formatWithPattern("yyyy-MM-dd'T'HH:00"),
    //   )
    //
    let until = event.startDate->Option.map(startDate =>
      startDate
      ->Util.Datetime.toDate
      ->DateFns.differenceInMinutes(Js.Date.make())
    )
    let duration = event.startDate->Option.flatMap(startDate =>
      event.endDate->Option.map(
        endDate =>
          endDate
          ->Util.Datetime.toDate
          ->DateFns.differenceInMinutes(startDate->Util.Datetime.toDate),
      )
    )
    let duration = duration->Option.map(duration => {
      let hours = duration /. 60.
      let minutes = mod(duration->Float.toInt, 60)
      if minutes == 0 {
        t`${hours->Float.toString} hours`
      } else {
        t`${hours->Float.toString} hours and ${minutes->Int.toString} minutes`
      }
    })

    <WaitForMessages>
      {() =>
        <Grid className="grid-cols-1 md:grid-cols-4">
          <div className="md:col-span-3">
            <PageTitle>
              <span className="text-gray-600"> {t`event: `} </span>
              {React.string(" ")}
              {title->Option.map(React.string)->Option.getOr(React.null)}
              {" @ "->React.string}
              {location
              ->Option.flatMap(location =>
                location.name->Option.map(
                  name => <Router.Link to={"/locations/" ++ location.id}> {name->React.string} </Router.Link>,
                )
              )
              ->Option.getOr(React.null)}
            </PageTitle>
            {event.startDate
            ->Option.flatMap(startDate =>
              event.endDate->Option.map(
                endDate => <p className="mt-4 lg:text-xl leading-8 text-gray-700">
                  <ReactIntl.FormattedDate value={startDate->Util.Datetime.toDate} />
                  {" "->React.string}
                  <ReactIntl.FormattedTime value={startDate->Util.Datetime.toDate} />
                  {" -> "->React.string}
                  <ReactIntl.FormattedTime value={endDate->Util.Datetime.toDate} />
                  {" "->React.string}
                  {duration
                  ->Option.map(
                    duration => <>
                      {" ("->React.string}
                      {duration}
                      {") "->React.string}
                    </>,
                  )
                  ->Option.getOr(React.null)}
                  {until
                  ->Option.map(
                    until =>
                      <ReactIntl.FormattedRelativeTime
                        value={until} unit=#minute updateIntervalInSeconds=1.
                      />,
                  )
                  ->Option.getOr(React.null)}
                </p>,
              )
            )
            ->Option.getOr("???"->React.string)}
            {location
            ->Option.map(location => <EventLocation location=location.fragmentRefs />)
            ->Option.getOr(React.null)}
            {details
            ->Option.map(details =>
              <p className="mt-4 lg:text-xl leading-8 text-gray-700"> {details->React.string} </p>
            )
            ->Option.getOr(React.null)}
          </div>
          // <ViewerRsvpStatus onJoin onLeave joined=true />
          <EventRsvps event=fragmentRefs />
        </Grid>}
    </WaitForMessages>
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
  | "ja" => Lingui.import("../../locales/src/components/pages/Event.re/ja")
  | _ => Lingui.import("../../locales/src/components/pages/Event.re/en")
  }->Promise.thenResolve(messages =>
    Util.startTransition(() => Lingui.i18n.load(lang, messages["messages"]))
  )
  [messages]
  // ->Array.concat(EventRsvps.loadMessages(lang))
  // ->Array.concat(ViewerRsvpStatus.loadMessages(lang))
}

@genType
let loader = async ({?context, params, request}: LoaderArgs.t) => {
  let url = request.url->Router.URL.make

  // let lang = params.lang->Option.getOr("en")

  let after = url.searchParams->Router.SearchParams.get("after")
  let before = url.searchParams->Router.SearchParams.get("before")

  (RelaySSRUtils.ssr ? Some(await Localized.loadMessages(params.lang, loadMessages)) : None)->ignore

  Router.defer({
    WaitForMessages.data: Option.map(RelayEnv.getRelayEnv(context, RelaySSRUtils.ssr), env =>
      EventQuery_graphql.load(
        ~environment=env,
        ~variables={eventId: params.eventId, ?after, ?before, first: 20},
        ~fetchPolicy=RescriptRelay.StoreOrNetwork,
      )
    ),
    i18nLoaders: Localized.loadMessages(params.lang, loadMessages),
  })
}

// @genType
// let \"HydrateFallbackElement" = <div> {React.string("Loading fallback...")} </div>
%raw("loader.hydrate = true")
