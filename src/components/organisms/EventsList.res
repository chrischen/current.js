%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
open Util
module Fragment = %relay(`
  fragment EventsListFragment on Query
  @argumentDefinitions (
    after: { type: "String" }
    before: { type: "String" }
    first: { type: "Int", defaultValue: 20 }
  )
  @refetchable(queryName: "EventsListRefetchQuery")
  {
    events(after: $after, first: $first, before: $before)
    @connection(key: "EventsListFragment_events") {
      edges {
        node {
          id
          ...EventsList_event
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`)

module ItemFragment = %relay(`
  fragment EventsList_event on Event {
    id
    title
    location
    startDate
  }
`)

module NodeId: {
  type t
  let toId: t => string
  let make: (string, string) => t
} = {
  type t = (string, string)
  let make = (key, id) => {
    (key, id)
  }
  let toId = ((_, id): t) => {
    id
  }
}
module NodeIdDto: {
  type t = string
  let toDomain: t => result<NodeId.t, [> #InvalidNode]>
} = {
  type t = string
  let toDomain = (t: t) => {
    switch t->String.split(":") {
    | [key, id] => Ok(NodeId.make(key, id))
    | _ => Error(#InvalidNode)
    }
  }
}

module EventItem = {
  @react.component
  let make = (~event) => {
    let {id, title, location, startDate} = ItemFragment.use(event)
    // let id = id->NodeIdDto.toDomain->Result.map(NodeId.toId)

    // id->Result.map(id =>
    <Link to={"./events/" ++ id}>
      {title->Option.getOr("[Missing Title]")->React.string}
      {React.string("@")}
      {location->Option.getOr("[Location Missing]")->React.string}
      {React.string(" - ")}
      <ReactIntl.FormattedDate
        value={startDate
        ->Option.map(_, Util.Datetime.toDate)
        ->Option.getOr(Js.Date.fromString("2024-01-01"))}
      />
    </Link>
    // )->Result.getOr(React.null)
  }
}

@genType @react.component
let make = (~events) => {
  let (_isPending, _) = ReactExperimental.useTransition()
  let {data, isLoadingNext, hasNext, isLoadingPrevious} = Fragment.usePagination(events)
  let events = data.events->Fragment.getConnectionNodes
  let pageInfo = data.events.pageInfo
  let hasPrevious = pageInfo.hasPreviousPage

  // let onLoadMore = _ =>
  //   startTransition(() => {
  //     loadNext(~count=1)->ignore
  //   })
  //
  <>
    {hasPrevious && !isLoadingPrevious
      ? pageInfo.startCursor
        ->Option.map(startCursor =>
          <Util.Link to={"./" ++ "?before=" ++ startCursor}> {%raw("t`load previous`")} </Util.Link>
        )
        ->Option.getOr(React.null)
      : React.null}
    <ul role="list" className="divide-y divide-gray-200">
      {events
      ->Array.map(edge =>
        <li key={edge.id} className="px-4 py-4 sm:px-0">
          <EventItem event=edge.fragmentRefs />
        </li>
      )
      ->React.array}
    </ul>
    {hasNext && !isLoadingNext
      ? pageInfo.endCursor
        ->Option.map(endCursor =>
          <Util.Link to={"./" ++ "?after=" ++ endCursor}> {%raw("t`load more`")} </Util.Link>
        )
        ->Option.getOr(React.null)
      : React.null}
  </>
}

@genType
let default = make
