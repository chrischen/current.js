// Generated by ReScript, PLEASE EDIT WITH CARE

import * as RelayEnv from "../../entry/RelayEnv.mjs";
import * as EventRsvps from "../organisms/EventRsvps.mjs";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Core__Option from "@rescript/core/src/Core__Option.mjs";
import * as Core from "@linaria/core";
import * as ReactRouterDom from "react-router-dom";
import * as JsxRuntime from "react/jsx-runtime";
import * as EventQuery_graphql from "../../__generated__/EventQuery_graphql.mjs";
import * as Event_event_graphql from "../../__generated__/Event_event_graphql.mjs";
import * as RescriptRelay_Query from "rescript-relay/src/RescriptRelay_Query.mjs";
import * as RescriptRelay_Fragment from "rescript-relay/src/RescriptRelay_Fragment.mjs";

import { css, cx } from '@linaria/core'
;

import { t } from '@lingui/macro'
;

var convertVariables = EventQuery_graphql.Internal.convertVariables;

var convertResponse = EventQuery_graphql.Internal.convertResponse;

var convertWrapRawResponse = EventQuery_graphql.Internal.convertWrapRawResponse;

var use = RescriptRelay_Query.useQuery(convertVariables, EventQuery_graphql.node, convertResponse);

var useLoader = RescriptRelay_Query.useLoader(convertVariables, EventQuery_graphql.node, (function (prim) {
        return prim;
      }));

var usePreloaded = RescriptRelay_Query.usePreloaded(EventQuery_graphql.node, convertResponse, (function (prim) {
        return prim;
      }));

var $$fetch = RescriptRelay_Query.$$fetch(EventQuery_graphql.node, convertResponse, convertVariables);

var fetchPromised = RescriptRelay_Query.fetchPromised(EventQuery_graphql.node, convertResponse, convertVariables);

var retain = RescriptRelay_Query.retain(EventQuery_graphql.node, convertVariables);

var EventQuery = {
  Operation: undefined,
  Types: undefined,
  convertVariables: convertVariables,
  convertResponse: convertResponse,
  convertWrapRawResponse: convertWrapRawResponse,
  use: use,
  useLoader: useLoader,
  usePreloaded: usePreloaded,
  $$fetch: $$fetch,
  fetchPromised: fetchPromised,
  retain: retain
};

var convertFragment = Event_event_graphql.Internal.convertFragment;

function use$1(fRef) {
  return RescriptRelay_Fragment.useFragment(Event_event_graphql.node, convertFragment, fRef);
}

function useOpt(fRef) {
  return RescriptRelay_Fragment.useFragmentOpt(fRef !== undefined ? Caml_option.some(Caml_option.valFromOption(fRef)) : undefined, Event_event_graphql.node, convertFragment);
}

var Fragment = {
  Types: undefined,
  Operation: undefined,
  convertFragment: convertFragment,
  use: use$1,
  useOpt: useOpt
};

function $$Event(props) {
  var query = ReactRouterDom.useLoaderData();
  var match = usePreloaded(query);
  return Core__Option.getOr(Core__Option.map(match.event, (function (param) {
                    return JsxRuntime.jsxs("div", {
                                children: [
                                  JsxRuntime.jsx("h1", {
                                        children: Core__Option.getOr(Core__Option.map(param.title, (function (prim) {
                                                    return prim;
                                                  })), null)
                                      }),
                                  JsxRuntime.jsx("div", {
                                        className: Core.cx("grid", "grid-cols-1", "gap-y-10", "sm:grid-cols-2", "gap-x-6", "lg:grid-cols-3", "xl:gap-x-8")
                                      }),
                                  JsxRuntime.jsx(EventRsvps.make, {
                                        users: param.fragmentRefs
                                      })
                                ],
                                className: "bg-white"
                              });
                  })), JsxRuntime.jsx("div", {
                  children: "Event Doesn't Exist"
                }));
}

var LoaderArgs = {};

function loader(param) {
  var params = param.params;
  return Core__Option.map(RelayEnv.getRelayEnv(param.context, import.meta.env.SSR), (function (env) {
                return EventQuery_graphql.load(env, params, "store-or-network", undefined, undefined);
              }));
}

var make = $$Event;

var $$default = $$Event;

var Component = $$Event;

export {
  EventQuery ,
  Fragment ,
  make ,
  $$default ,
  $$default as default,
  Component ,
  LoaderArgs ,
  loader ,
}
/*  Not a pure module */
