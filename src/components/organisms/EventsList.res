%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
open Util
module Fragment = %relay(`
  fragment EventsListFragment on Query
    @argumentDefinitions (
    after: { type: "String" }
    before: { type: "String" }
    first: { type: "Int", defaultValue: 2 }
  )
  @refetchable(queryName: "EventsListRefetchQuery")
  {
    events(after: $after, first: $first, before: $before)
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

module EventItem = {
  @react.component
  let make = (~event) => {
    let {id, title, location, startDate} = ItemFragment.use(event)
    <Link to={"/events/" ++ id}>
      {title->Option.getOr("[Missing Title]")->React.string}
      {React.string("@")}
      {location->Option.getOr("[Location Missing]")->React.string}
      {React.string(" - ")}
      {startDate
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
  let {data, loadNext, isLoadingNext, hasNext, isLoadingPrevious} = Fragment.usePagination(events)
  let events = data.events->Fragment.getConnectionNodes
  let pageInfo = data.events->Option.map(e => e.pageInfo)
  let hasPrevious = pageInfo->Option.map(e => e.hasPreviousPage)->Option.getOr(false)

  let onLoadMore = _ =>
    startTransition(() => {
      loadNext(~count=1)->ignore
    })

  <>
    {hasPrevious && !isLoadingPrevious
      ? pageInfo
        ->Option.flatMap(pageInfo => {
          pageInfo.startCursor->Option.map(startCursor =>
            <Util.Link to={"/" ++ "?before=" ++ startCursor}>{React.string("Load more")}</Util.Link>
          )
        })
        ->Option.getOr(React.null)
      : React.null}
    <ul>
      {events
      ->Array.map(edge =>
        <li>
          <EventItem event=edge.fragmentRefs />
        </li>
      )
      ->React.array}
    </ul>
    // {hasNext && !isLoadingNext ? <a onClick={onLoadMore}> {React.string("Load More")} </a> : React.string("End of the road.")}
    {hasNext && !isLoadingNext
      ? pageInfo
        ->Option.flatMap(pageInfo => {
          Js.log(pageInfo);
          pageInfo.endCursor->Option.map(endCursor =>
            <Util.Link to={"/" ++ "?after=" ++ endCursor}>{React.string("Load more")}</Util.Link>
          )
        })
        ->Option.getOr(React.null)
      : React.string("End of the road.")}
  </>
}

@genType
let default = make
