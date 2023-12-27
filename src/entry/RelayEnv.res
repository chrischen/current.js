let network = RescriptRelay.Network.makeObservableBased(
  ~observableFunction=NetworkUtils.makeFetchQuery(),
)

let makeEnvironmentWithNetwork = (~network, ~missingFieldHandlers=?) =>
  RescriptRelay.Environment.make(
    ~network,
    ~missingFieldHandlers=?{missingFieldHandlers},
    ~store=RescriptRelay.Store.make(
      ~source=RescriptRelay.RecordSource.make(),
      ~gcReleaseBufferSize=50,
      ~queryCacheExpirationTime=6 * 60 * 60 * 1000,
    ),
  )

let environment = makeEnvironmentWithNetwork(~network)


type request = {
  headers: Js.Json.t
}
@live
let makeServer = (~onQuery, ~request: request) => {
  let network = RescriptRelay.Network.makeObservableBased(
    ~observableFunction=NetworkUtils.makeServerFetchQuery(~onQuery, ~headers=%raw("{...request.headers, 'content-type': 'application/json'}")),
  )
  makeEnvironmentWithNetwork(~network)
}

type context = {environment: RescriptRelay.Environment.t}
let getRelayEnv = (context: option<context>, ssr): option<RescriptRelay.Environment.t> => {
  if ssr {
    context->Option.map(context => context.environment)
  } else {
    Some(environment)
  }
}
