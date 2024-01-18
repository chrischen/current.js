%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
// module EventQuery = %relay(`
//   query EventQuery($eventId: ID!, $after: String, $first: Int, $before: String) {
//     event(id: $eventId) {
//       __id
//       title
//       ...EventRsvps_event @arguments(after: $after, first: $first, before: $before)
//     }
//   }
// `)

module CreateEventMutation = %relay(`
 mutation CreateEventMutation(
    $connections: [ID!]!
    $input: CreateEventInput!
  ) {
    createEvent(input: $input) {
      event @appendNode(connections: $connections, edgeTypeName: "event") {
        id
        title
        startDate
        endDate
      }
    }
  }
`)

@module("react-router-dom")
external useLoaderData: unit => EventQuery_graphql.queryRef = "useLoaderData"

@module("../layouts/appContext")
external sessionContext: React.Context.t<UserProvider.session> = "SessionContext"
@genType @react.component
let make = () => {
  let (commitMutationCreate, isMutationInFlight) = CreateEventMutation.use()

  let onCreateEvent = _ => {
    let connectionId = RescriptRelay.ConnectionHandler.getConnectionID(
      "client:root"->RescriptRelay.makeDataId,
      "EventsListFragment_events",
      (),
    )
    commitMutationCreate(
      ~variables={
        input: {
          title: "Event title",
          description: "Descrition",
          startDate: Util.Datetime.fromDate(
            Date.makeWithYMDH(~year=2024, ~month=1, ~date=5, ~hours=18),
          ),
          endDate: Util.Datetime.fromDate(
            Date.makeWithYMDH(~year=2024, ~month=1, ~date=5, ~hours=21),
          ),
        },
        connections: [connectionId],
      },
    )->RescriptRelay.Disposable.ignore
  }

  <div className="bg-white">
    <div
      className={Util.cx([
        "grid",
        "grid-cols-2",
        "gap-y-10",
        "sm:grid-cols-4",
        "gap-x-6",
        "lg:grid-cols-6",
        "xl:gap-x-8",
      ])}>
      <form onSubmit=(onCreateEvent)>
        <label>
          {%raw("t`Title`")}{React.string(":")}
          <input type_="text" name="title" />
        </label>
        <label>
          {%raw("t`Start Date`")}{React.string(":")}
          <input type_="text" name="startDate" />
        </label>
        <label>
          {%raw("t`End Date`")}{React.string(":")}
          <input type_="text" name="endDate" />
        </label>
        <input type_="submit" value="Create" />
      </form>
    </div>
  </div>
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
