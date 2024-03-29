// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Core__Option from "@rescript/core/src/Core__Option.mjs";
import * as NetworkUtils from "../../server/NetworkUtils.mjs";
import * as RescriptRelay from "rescript-relay/src/RescriptRelay.mjs";
import * as RelayRuntime from "relay-runtime";

var network = RelayRuntime.Network.create(NetworkUtils.makeFetchQuery());

function makeEnvironmentWithNetwork(network, missingFieldHandlers) {
  return RescriptRelay.Environment.make(network, RescriptRelay.Store.make(new RelayRuntime.RecordSource(undefined), 50, 21600000), undefined, undefined, missingFieldHandlers, undefined, undefined);
}

var environment = makeEnvironmentWithNetwork(network, undefined);

function makeServer(onQuery, request) {
  var network = RelayRuntime.Network.create(NetworkUtils.makeServerFetchQuery(onQuery, ({...request.headers, 'content-type': 'application/json'})));
  return makeEnvironmentWithNetwork(network, undefined);
}

function getRelayEnv(context, ssr) {
  if (ssr) {
    return Core__Option.map(context, (function (context) {
                  return context.environment;
                }));
  } else {
    return Caml_option.some(environment);
  }
}

export {
  network ,
  makeEnvironmentWithNetwork ,
  environment ,
  makeServer ,
  getRelayEnv ,
}
/* network Not a pure module */
