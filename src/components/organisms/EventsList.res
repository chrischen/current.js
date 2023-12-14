%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
open Util;
module Fragment = %relay(`
  fragment EventsListFragment on Query
    @argumentDefinitions (
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 10 }
  )
  @refetchable(queryName: "EventsListRefetchQuery")
  {
    events(after: $cursor, first: $count)
    @connection(key: "EventsListFragment_events")
{
      edges {
        node {
          id
          ...EventsList_event
        }
      }
      pageInfo {
        hasNextPage
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
    startTime
  }
`)

module EventItem = {
  @react.component
  let make = (~event) => {
    let {id, title, location, startTime} = ItemFragment.use(event)
    <Link to={"/events/" ++ id}>
      {title->Option.getOr("[Missing Title]")->React.string}
      {React.string("@")}
      {location->Option.getOr("[Location Missing]")->React.string}
      {React.string(" - ")}
      {startTime
      ->Option.map(_, Util.Datetime.toDate)
      ->Option.getOr(Js.Date.make())
      ->Js.Date.toString
      ->React.string}
    </Link>
  }
}

@genType @react.component
let make = (~events) => {
  let (_isPending, startTransition) = ReactExperimental.useTransition()
  let {data, loadNext, isLoadingNext, hasNext} = Fragment.usePagination(events)
  let events = data.events->Fragment.getConnectionNodes

  let onLoadMore = _ =>
    startTransition(() => {
      loadNext(~count=10)->ignore
    })

  <>
    <ul>
      {events->Array.map(edge => 
        <li>
          <EventItem event=edge.fragmentRefs />
        </li>
      )->React.array}
    </ul>
    {hasNext && !isLoadingNext ? <a onClick={onLoadMore}> {React.string("Load More")} </a> : React.string("End of the road.")}
  </>
}

@genType
let default = make
