// type session = {viewer: option<UserProvider_user_graphql.Types.fragment_viewer>}
// module SessionContextProvider = {
//   @react.component @module("./appContext") @scope("SessionContext")
//   external make: (~children: React.element, ~value: session) => React.element = "Provider"

module Fragment = %relay(`
  fragment GlobalQueryProvider_viewer on Viewer {
    user {
      id
      lineUsername
    }
  }
`)

type query = option<RescriptRelay.fragmentRefs<[#GlobalQueryProvider_viewer]>>
let context: React.Context.t<query> = React.createContext(None)
let make = React.Context.provider(context)

