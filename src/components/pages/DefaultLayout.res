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


module RouteParams = {
  type t = {lang: option<string>}

  let parse = (json: Js.Json.t): result<t, string> => {
    open JsonCombinators.Json.Decode

    let decoder = object(field => {
      lang: field.optional("lang", string),
    })
    try {
      json->JsonCombinators.Json.decode(decoder)
    } catch {
    | _ => Error("An unexpected error occurred when checking the id.")
    }
  }
}
@genType @react.component
let make = () => {
  //let { fragmentRefs } = Fragment.use(events)
  let query = useLoaderData()

  open Router
  let navigate = useNavigate()
  let paramsJs = useParams()
  let location = useLocation()

  let lang = paramsJs->RouteParams.parse->Belt.Result.mapWithDefault(None, ({lang}) => lang)
  let { fragmentRefs } = DefaultLayoutQuery.usePreloaded(~queryRef=query)

  // React.useEffect1(() => {
  //   switch lang {
  //   | Some("en") | Some("jp") => ()
  //   | _ => navigate("/en" ++ location.pathname, Some({replace: true}))
  //   }
  //
  //   Some(() => ())
  // }, [lang])

  <DefaultLayout fragmentRefs><React.Suspense fallback={"Loading"->React.string}><Router.Outlet /></React.Suspense></DefaultLayout>
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
