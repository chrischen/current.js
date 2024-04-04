%%raw("import { t } from '@lingui/macro'")
type data<'a> = {
  data: 'a,
  i18nLoaders?: promise<array<unit>>,
  i18nData?: array<unit>,
}

@module("react-router-dom")
external useLoaderData: unit => data<'a> = "useLoaderData"

@react.component
let make = (~children: unit => React.element) => {
  //let { fragmentRefs } = Fragment.use(events)
  let query = useLoaderData()

  // @NOTE: If we immediately suspend, client triggers the Suspense fallback
  // immediately from client loader
  // <React.Suspense fallback={"loading lang..."->React.string}>

  {
    switch query.i18nLoaders {
    | Some(loaders) =>
      <Router.Await resolve={loaders} errorElement={React.string("Error loading translations")}>
        {_ => {
          children()
        }}
      </Router.Await>
    | None => children()
    }
  }

  // </React.Suspense>
}
