%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")

module DefaultLayoutQuery = %relay(`
  query DefaultLayoutQuery {
    ... Nav_user
    ... UserProvider_user
  }
`)
@module("react-router-dom")
external useLoaderData: unit => DefaultLayoutQuery_graphql.queryRef = "useLoaderData"

module MenuInstance = {
  @module("../ui/navigation-menu") @react.component
  external make: unit => React.element = "MenuInstance"
}

module DefaultLayout = {
  @module("../layouts/default.tsx") @react.component
  external make: (
    ~children: React.element,
    ~fragmentRefs: RescriptRelay.fragmentRefs<[> #Nav_user]>,
  ) => React.element = "default"
}

@genType @react.component
let make = () => {
  //let { fragmentRefs } = Fragment.use(events)
  let query = useLoaderData()
  let { fragmentRefs } = DefaultLayoutQuery.usePreloaded(~queryRef=query)

  <DefaultLayout fragmentRefs><React.Suspense fallback="Loading"><Router.Outlet /></React.Suspense></DefaultLayout>
}

@genType
let default = make

@genType
let \"Component" = make

module LoaderArgs = {
  type t = {
    context?: RelayEnv.context,
    params: DefaultLayoutQuery_graphql.Types.variables,
    request: Router.RouterRequest.t
  }
}
@genType
let loader = ({?context, params, request}: LoaderArgs.t) => {
  let url = request.url->Router.URL.make
  Option.map(RelayEnv.getRelayEnv(context, RelaySSRUtils.ssr), env =>
    DefaultLayoutQuery_graphql.load(
      ~environment=env,
      ~variables=(),
      ~fetchPolicy=RescriptRelay.StoreOrNetwork,
    )
  )
}
