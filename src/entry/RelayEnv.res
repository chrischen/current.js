/* let preparedAssetsMap = Dict.make() */

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

@live
let makeServer = (~onQuery) => {
  let network = RescriptRelay.Network.makeObservableBased(
    ~observableFunction=NetworkUtils.makeServerFetchQuery(~onQuery),
  )
  makeEnvironmentWithNetwork(~network)
}

type context = {environment: RescriptRelay.Environment.t}
let getRelayEnv = (context: Nullable.t<context>, ssr): Nullable.t<RescriptRelay.Environment.t> => {
  if ssr {
    context->Js.toOption->Option.map(context => context.environment)->Js.Null_undefined.fromOption
  } else {
    Some(environment)->Js.Null_undefined.fromOption
  }
}
/* function getRelayEnv(context: { environment: Environment }, ssr: boolean) {
  if (ssr) return context?.environment;
  return environment;
} */
