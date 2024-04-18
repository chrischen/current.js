%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")

// type data<'a> = Promise('a) | Empty

module Fragment = %relay(`
  fragment CreateEvent_query on Query 
  @argumentDefinitions (
    after: { type: "String" }
    before: { type: "String" }
    first: { type: "Int", defaultValue: 20 }
  )
  @refetchable(queryName: "CreateEventRefetchQuery")
  {
    locations(after: $after, first: $first, before: $before)
    @connection(key: "CreateEvent_locations") {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`)

@module("../layouts/appContext")
external sessionContext: React.Context.t<UserProvider.session> = "SessionContext"

@react.component
let make = (~locations) => {
  open Lingui.Util
  // let ts = Lingui.UtilString.t
  let {pathname} = Router.useLocation()

  let data = Fragment.use(locations)
  let locations = data.locations->Fragment.getConnectionNodes
  let (showCreateLocation, setShowCreateLocation) = React.useState(() => false)

  <WaitForMessages>
    {() => <Layout.Container>
    <Grid>
      <FormSection
        title={t`Event Location`}
        description={t`Choose the location where this event will be held.`}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
          <ul>
            {locations
            ->Array.map(node =>
              <li key={node.id}>
                <Router.Link to={node.id->Util.encodeURIComponent}>
                  {node.name->Option.getOr("?")->React.string}
                </Router.Link>
              </li>
            )
            ->React.array}
          </ul>
          <a href="#" onClick={_ => setShowCreateLocation(prev => !prev)}>
          {(showCreateLocation ? "- " : "+ ")->React.string}{t`Add New Location`}
          </a>
          <FramerMotion.AnimatePresence mode="sync">
            {showCreateLocation
              ? <FramerMotion.Div
                  className=""
                  style={opacity: 1., y: 0.}
                  initial={opacity: 0., scale: 1., y: -50.}
                  animate={opacity: 1., scale: 1., y: 0.00}
                  exit={opacity: 0., scale: 1., y: -50.}>
                  <CreateLocation onCancel={_ => setShowCreateLocation(_ => false)} />
                </FramerMotion.Div>
              : React.null}
          </FramerMotion.AnimatePresence>
        </div>
      </FormSection>
      <FramerMotion.AnimatePresence mode="wait">
        <Router.Outlet />
      </FramerMotion.AnimatePresence>
      </Grid>
    </Layout.Container>}
  </WaitForMessages>
}
