module Query: (module type of %relay(`
  query DefaultLayoutQuery {
    ...Nav_query
    viewer { 
      ... GlobalQueryProvider_viewer
    }
  }
`))

module Layout: {
  @react.component
  let make: (~children: React.element, ~query: RescriptRelay.fragmentRefs<[> #Nav_query]>
, ~viewer: option<Query.Types.response_viewer>) => React.element
}
@react.component
let make: unit => React.element
