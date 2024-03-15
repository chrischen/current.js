// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Lingui from "../../locales/Lingui.mjs";
import * as RelayEnv from "../../entry/RelayEnv.mjs";
import * as EventRsvps from "../organisms/EventRsvps.mjs";
import * as Core__Option from "@rescript/core/src/Core__Option.mjs";
import * as Core from "@linaria/core";
import * as RelayRuntime from "relay-runtime";
import * as ViewerRsvpStatus from "../organisms/ViewerRsvpStatus.mjs";
import * as ReactRouterDom from "react-router-dom";
import * as JsxRuntime from "react/jsx-runtime";
import * as EventQuery_graphql from "../../__generated__/EventQuery_graphql.mjs";
import * as RescriptRelay_Query from "rescript-relay/src/RescriptRelay_Query.mjs";
import * as AppContext from "../layouts/appContext";
import * as RescriptRelay_Mutation from "rescript-relay/src/RescriptRelay_Mutation.mjs";
import * as EventJoinMutation_graphql from "../../__generated__/EventJoinMutation_graphql.mjs";
import * as EventLeaveMutation_graphql from "../../__generated__/EventLeaveMutation_graphql.mjs";

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

var convertVariables$1 = EventJoinMutation_graphql.Internal.convertVariables;

var convertResponse$1 = EventJoinMutation_graphql.Internal.convertResponse;

var convertWrapRawResponse$1 = EventJoinMutation_graphql.Internal.convertWrapRawResponse;

var commitMutation = RescriptRelay_Mutation.commitMutation(convertVariables$1, EventJoinMutation_graphql.node, convertResponse$1, convertWrapRawResponse$1);

var use$1 = RescriptRelay_Mutation.useMutation(convertVariables$1, EventJoinMutation_graphql.node, convertResponse$1, convertWrapRawResponse$1);

var EventJoinMutation = {
  Operation: undefined,
  Types: undefined,
  convertVariables: convertVariables$1,
  convertResponse: convertResponse$1,
  convertWrapRawResponse: convertWrapRawResponse$1,
  commitMutation: commitMutation,
  use: use$1
};

var convertVariables$2 = EventLeaveMutation_graphql.Internal.convertVariables;

var convertResponse$2 = EventLeaveMutation_graphql.Internal.convertResponse;

var convertWrapRawResponse$2 = EventLeaveMutation_graphql.Internal.convertWrapRawResponse;

var commitMutation$1 = RescriptRelay_Mutation.commitMutation(convertVariables$2, EventLeaveMutation_graphql.node, convertResponse$2, convertWrapRawResponse$2);

var use$2 = RescriptRelay_Mutation.useMutation(convertVariables$2, EventLeaveMutation_graphql.node, convertResponse$2, convertWrapRawResponse$2);

var EventLeaveMutation = {
  Operation: undefined,
  Types: undefined,
  convertVariables: convertVariables$2,
  convertResponse: convertResponse$2,
  convertWrapRawResponse: convertWrapRawResponse$2,
  commitMutation: commitMutation$1,
  use: use$2
};

var sessionContext = AppContext.SessionContext;

function $$Event(props) {
  var query = ReactRouterDom.useLoaderData();
  var match = usePreloaded(query.data);
  var match$1 = use$2(undefined);
  var commitMutationLeave = match$1[0];
  var match$2 = use$1(undefined);
  var commitMutationJoin = match$2[0];
  return Core__Option.getOr(Core__Option.map(match.event, (function ($$event) {
                    var __id = $$event.__id;
                    var onJoin = function (param) {
                      var connectionId = RelayRuntime.ConnectionHandler.getConnectionID(__id, "EventRsvps_event_rsvps", undefined);
                      commitMutationJoin({
                            connections: [connectionId],
                            id: __id
                          }, undefined, undefined, undefined, undefined, undefined, undefined);
                    };
                    var onLeave = function (param) {
                      var connectionId = RelayRuntime.ConnectionHandler.getConnectionID(__id, "EventRsvps_event_rsvps", undefined);
                      commitMutationLeave({
                            connections: [connectionId],
                            id: $$event.__id
                          }, undefined, undefined, undefined, undefined, undefined, undefined);
                    };
                    return JsxRuntime.jsx(ReactRouterDom.Await, {
                                children: JsxRuntime.jsxs("div", {
                                      children: [
                                        JsxRuntime.jsxs("h1", {
                                              children: [
                                                (t`Event:`),
                                                " ",
                                                Core__Option.getOr(Core__Option.map($$event.title, (function (prim) {
                                                            return prim;
                                                          })), null)
                                              ]
                                            }),
                                        JsxRuntime.jsx("div", {
                                              className: Core.cx("grid", "grid-cols-1", "gap-y-10", "sm:grid-cols-2", "gap-x-6", "lg:grid-cols-3", "xl:gap-x-8")
                                            }),
                                        JsxRuntime.jsx(ViewerRsvpStatus.make, {
                                              onJoin: onJoin,
                                              onLeave: onLeave,
                                              joined: true
                                            }),
                                        JsxRuntime.jsx(EventRsvps.make, {
                                              event: $$event.fragmentRefs
                                            })
                                      ],
                                      className: "bg-white"
                                    }),
                                resolve: query.messages,
                                errorElement: "Error loading"
                              });
                  })), JsxRuntime.jsx("div", {
                  children: "Event Doesn't Exist"
                }));
}

var LoaderArgs = {};

function getMessages(lang) {
  var tmp = lang === "jp" ? import("../../locales/src/components/pages/Event/jp") : import("../../locales/src/components/pages/Event/en");
  return [tmp.then(function (messages) {
                Lingui.i18n.load(lang, messages.messages);
              })];
}

function loader(param) {
  var params = param.params;
  var url = new URL(param.request.url);
  var lang = Core__Option.getOr(params.lang, "en");
  var messages = Promise.all(getMessages(lang));
  var after = url.searchParams.get("after");
  var before = url.searchParams.get("before");
  return ReactRouterDom.defer({
              data: Core__Option.map(RelayEnv.getRelayEnv(param.context, import.meta.env.SSR), (function (env) {
                      return EventQuery_graphql.load(env, {
                                  after: after,
                                  before: before,
                                  eventId: params.eventId,
                                  first: 20
                                }, "store-or-network", undefined, undefined);
                    })),
              messages: messages
            });
}

var make = $$Event;

var $$default = $$Event;

var Component = $$Event;

export {
  EventQuery ,
  EventJoinMutation ,
  EventLeaveMutation ,
  sessionContext ,
  make ,
  $$default ,
  $$default as default,
  Component ,
  LoaderArgs ,
  getMessages ,
  loader ,
}
/*  Not a pure module */
