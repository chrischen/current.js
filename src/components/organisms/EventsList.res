%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t, plural } from '@lingui/macro'")
open Util
module Fragment = %relay(`
  fragment EventsListFragment on Query
  @argumentDefinitions (
    after: { type: "String" }
    before: { type: "String" }
    first: { type: "Int", defaultValue: 20 }
    afterDate: { type: "Datetime" }
    filters: { type: "EventFilters" }
  )
  @refetchable(queryName: "EventsListRefetchQuery")
  {
    events(after: $after, first: $first, before: $before, filters: $filters, afterDate: $afterDate)
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
    location {
      id
      name
    }
    rsvps {
      edges {
        node {
          id
        }
      }
    }
    startDate
    endDate
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
  open Lingui.Util
  let ts = Lingui.UtilString.t
  @react.component
  let make = (~event) => {
    let {id, title, location, startDate, rsvps, endDate} = ItemFragment.use(event)
    let playersCount =
      rsvps
      ->Option.flatMap(rsvps => rsvps.edges->Option.map(edges => edges->Array.length))
      ->Option.getOr(0)
    // let id = id->NodeIdDto.toDomain->Result.map(NodeId.toId)

    // id->Result.map(id =>
    let duration = startDate->Option.flatMap(startDate =>
      endDate->Option.map(endDate =>
        endDate
        ->Util.Datetime.toDate
        ->DateFns.differenceInMinutes(startDate->Util.Datetime.toDate)
      )
    )
    let duration = duration->Option.map(duration => {
      let hours = duration /. 60.
      let minutes = mod(duration->Float.toInt, 60)
      if minutes == 0 {
        plural(
          hours->Float.toInt,
          {one: ts`${hours->Float.toString} hour`, other: ts`${hours->Float.toString} hours`},
        )
      } else {
        // t`${hours->Float.toString} hours and ${minutes->Int.toString} minutes`
        <>
          {plural(
            hours->Float.toInt,
            {one: ts`${hours->Float.toString} hour`, other: ts`${hours->Float.toString} hours`},
          )}
          {" "->React.string}
          {plural(
            minutes,
            {
              one: ts`${minutes->Int.toString} minute`,
              other: ts`${minutes->Int.toString} minutes`,
            },
          )}
        </>
      }
    })
    <li>
      <Layout.Container className="relative flex items-center space-x-4 py-4">
        <div className="min-w-0 flex-auto">
          <div className="flex items-center gap-x-3">
            <div
              className={Util.cx(["text-green-400 bg-green-400/10", "flex-none rounded-full p-1"])}>
              <div className="h-2 w-2 rounded-full bg-current" />
            </div>
            <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
              <Link to={"/events/" ++ id} className="flex gap-x-2">
                <span className="truncate">
                  {title->Option.getOr(ts`[Missing Title]`)->React.string}
                </span>
                <span className="absolute inset-0" />
              </Link>
            </h2>
          </div>
          <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-600">
            <p className="truncate">
              {location
              ->Option.flatMap(l => l.name->Option.map(name => name->React.string))
              ->Option.getOr(t`[Location Missing]`)}
            </p>
            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-600">
              <circle cx={1->Int.toString} cy={1->Int.toString} r={1->Int.toString} />
            </svg>
            <p className="whitespace-nowrap">
              {startDate
              ->Option.map(startDate =>
                <ReactIntl.FormattedTime value={startDate->Util.Datetime.toDate} />
              )
              ->Option.getOr(React.null)}
              {duration
              ->Option.map(duration => <>
                {" ("->React.string}
                {duration}
                {") "->React.string}
              </>)
              ->Option.getOr(React.null)}
            </p>
          </div>
          <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-600">
            <span className="whitespace-nowrap">
              {startDate
              ->Option.map(startDate =>
                <ReactIntl.FormattedDate value={startDate->Util.Datetime.toDate} />
              )
              ->Option.getOr("???"->React.string)}
            </span>
          </div>
        </div>
        <div
          className={Util.cx([
            "text-indigo-400 bg-indigo-400/10 ring-indigo-400/30",
            "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset",
          ])}>
          {(playersCount->Int.toString ++ " ")->React.string}
          {plural(playersCount, {one: "player", other: "players"})}
        </div>
        // <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" ariaHidden="true" />
      </Layout.Container>
    </li>
    // )->Result.getOr(React.null)
  }
}

@genType @react.component
let make = (~events) => {
  open Lingui.Util
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
    <Layout.Container>
      {!isLoadingPrevious
        ? pageInfo.startCursor
          ->Option.map(startCursor =>
            <Util.Link to={"./" ++ "?before=" ++ startCursor}> {t`...load past events`} </Util.Link>
          )
          ->Option.getOr(React.null)
        : React.null}
      {hasPrevious && !isLoadingPrevious
        ? pageInfo.startCursor
          ->Option.map(startCursor =>
            <Util.Link to={"./" ++ "?before=" ++ startCursor}> {t`load previous`} </Util.Link>
          )
          ->Option.getOr(React.null)
        : React.null}
    </Layout.Container>
    <ul role="list" className="divide-y divide-gray-200">
      {events
      ->Array.map(edge => <EventItem key={edge.id} event=edge.fragmentRefs />)
      ->React.array}
    </ul>
    <Layout.Container>
      {hasNext && !isLoadingNext
        ? pageInfo.endCursor
          ->Option.map(endCursor =>
            <Util.Link to={"./" ++ "?after=" ++ endCursor}> {t`load more`} </Util.Link>
          )
          ->Option.getOr(React.null)
        : React.null}
    </Layout.Container>
  </>
}

@genType
let default = make
