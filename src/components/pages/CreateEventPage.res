module Query = %relay(`
  query CreateEventPageQuery($after: String, $first: Int, $before: String) {
    ...CreateEvent_query @arguments(after: $after, first: $first, before: $before)
  }
  `)
type loaderData = CreateEventPageQuery_graphql.queryRef
@module("react-router-dom")
external useLoaderData: unit => WaitForMessages.data<loaderData> = "useLoaderData"

@react.component
let make = () => {
  let data = useLoaderData()
  let query = Query.usePreloaded(~queryRef=data.data)
  <CreateEvent locations={query.fragmentRefs} />
}
