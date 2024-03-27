%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
%%raw("import '../../global/static.css'")

module DefaultLayoutQuery = %relay(`
  query DefaultLayoutQuery {
    ...Nav_query
    viewer { 
      ... GlobalQueryProvider_viewer @defer
    }
  }
`)

@module("react-router-dom")
external useLoaderData: unit => Localized.data<DefaultLayoutQuery_graphql.queryRef> =
  "useLoaderData"

module MenuInstance = {
  @module("../ui/navigation-menu") @react.component
  external make: unit => React.element = "MenuInstance"
}

module Layout = {
  @react.component
  let make = (~children, ~query, ~viewer: option<DefaultLayoutQuery.Types.response_viewer>) => {
    // let query = useLoaderData()
    // <UserProvider query={fragmentRefs}>
    let viewer = viewer->Option.map(v => v.fragmentRefs)
    <GlobalQuery.Provider value={viewer}>
      <div>
        <React.Suspense fallback={"..."->React.string}>
          <Nav query={query} />
        </React.Suspense>
        <React.Suspense fallback={"..."->React.string}> {children} </React.Suspense>
        <Footer />
      </div>
    </GlobalQuery.Provider>
    // </UserProvider>
  }
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
  let paramsJs = useParams()

  // let lang = paramsJs->RouteParams.parse->Belt.Result.mapWithDefault(None, ({lang}) => lang)
  let {viewer, fragmentRefs} = DefaultLayoutQuery.usePreloaded(~queryRef=query.data)

  // <Router.Await2 resolve=query.i18nLoaders errorElement={"Error"->React.string}>
  <Container>
      <Layout viewer={viewer} query={fragmentRefs}>
        <Router.Outlet />
      </Layout>
  </Container>
  // </Router.Await2>
}

@genType
let default = make

@genType
let \"Component" = make

let loadMessages = lang => {
  let messages = switch lang {
  | "ja" => Lingui.import("../../locales/src/components/organisms/Nav/ja")
  | _ => Lingui.import("../../locales/src/components/organisms/Nav/en")
  }->Promise.thenResolve(messages => {

    Util.startTransition(() => Lingui.i18n.load(lang, messages["messages"]))
  })
  // }->Promise.thenResolve(messages => Lingui.i18n.loadAndActivate({locale: lang, messages: messages["messages"]}))
  [messages]
}
type params = {lang: option<string>}
module LoaderArgs = {
  type t = {
    context?: RelayEnv.context,
    params: params,
    request: Router.RouterRequest.t,
  }
}
@genType
let loader = async ({?context, params}: LoaderArgs.t) => {
  Router.defer({
    Localized.data: Option.map(RelayEnv.getRelayEnv(context, RelaySSRUtils.ssr), env =>
      DefaultLayoutQuery_graphql.load(
        ~environment=env,
        ~variables=(),
        ~fetchPolicy=RescriptRelay.StoreOrNetwork,
      )
    ),
    i18nLoaders: Localized.loadMessages(params.lang, loadMessages),
  })
}
@genType
let \"HydrateFallbackElement" =
  <div> {React.string("Loading fallback...")} </div>
// %raw("loader.hydrate = true")
