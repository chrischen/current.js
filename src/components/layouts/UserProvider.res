type session = {viewer: option<UserProvider_user_graphql.Types.fragment_viewer>}
module SessionContextProvider = {
  @react.component @module("./appContext") @scope("SessionContext")
  external make: (~children: React.element, ~value: session) => React.element = "Provider"
}

module Fragment = %relay(`
  fragment UserProvider_user on Query {
    viewer {
      user {
        id
        lineUsername
      }
    }
  }
`)

@react.component @genType
let make = (
  ~children: React.element,
  ~query: RescriptRelay.fragmentRefs<[> #UserProvider_user]>,
) => {
  let {viewer} = Fragment.use(query)
  <SessionContextProvider value={viewer: viewer}> {children} </SessionContextProvider>
}
