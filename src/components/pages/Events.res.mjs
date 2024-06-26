// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Lingui from "../../locales/Lingui.res.mjs";
import * as RelayEnv from "../../entry/RelayEnv.res.mjs";
import * as Localized from "../shared/i18n/Localized.res.mjs";
import * as PageTitle from "../vanillaui/atoms/PageTitle.res.mjs";
import * as EventsList from "../organisms/EventsList.res.mjs";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Core__Option from "@rescript/core/src/Core__Option.res.mjs";
import * as WaitForMessages from "../shared/i18n/WaitForMessages.res.mjs";
import * as ReactRouterDom from "react-router-dom";
import * as JsxRuntime from "react/jsx-runtime";
import * as EventsQuery_graphql from "../../__generated__/EventsQuery_graphql.res.mjs";
import * as RescriptRelay_Query from "rescript-relay/src/RescriptRelay_Query.res.mjs";

import { css, cx } from '@linaria/core'
;

import { t } from '@lingui/macro'
;

var convertVariables = EventsQuery_graphql.Internal.convertVariables;

var convertResponse = EventsQuery_graphql.Internal.convertResponse;

var convertWrapRawResponse = EventsQuery_graphql.Internal.convertWrapRawResponse;

var use = RescriptRelay_Query.useQuery(convertVariables, EventsQuery_graphql.node, convertResponse);

var useLoader = RescriptRelay_Query.useLoader(convertVariables, EventsQuery_graphql.node, (function (prim) {
        return prim;
      }));

var usePreloaded = RescriptRelay_Query.usePreloaded(EventsQuery_graphql.node, convertResponse, (function (prim) {
        return prim;
      }));

var $$fetch = RescriptRelay_Query.$$fetch(EventsQuery_graphql.node, convertResponse, convertVariables);

var fetchPromised = RescriptRelay_Query.fetchPromised(EventsQuery_graphql.node, convertResponse, convertVariables);

var retain = RescriptRelay_Query.retain(EventsQuery_graphql.node, convertVariables);

var EventsQuery = {
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

function Events(props) {
  var query = ReactRouterDom.useLoaderData();
  var match = usePreloaded(query.data);
  var fragmentRefs = match.fragmentRefs;
  return JsxRuntime.jsx(WaitForMessages.make, {
              children: (function () {
                  return JsxRuntime.jsxs(JsxRuntime.Fragment, {
                              children: [
                                JsxRuntime.jsx(PageTitle.make, {
                                      children: t`all events`
                                    }),
                                JsxRuntime.jsx(React.Suspense, {
                                      children: Caml_option.some(JsxRuntime.jsx(EventsList.make, {
                                                events: fragmentRefs
                                              })),
                                      fallback: "Loading events..."
                                    })
                              ]
                            });
                })
            });
}

var LoaderArgs = {};

function loadMessages(lang) {
  var tmp = lang === "ja" ? import("../../locales/src/components/pages/Events/ja") : import("../../locales/src/components/pages/Events/en");
  return [tmp.then(function (messages) {
                React.startTransition(function () {
                      Lingui.i18n.load(lang, messages.messages);
                    });
              })];
}

async function loader(param) {
  var params = param.params;
  var url = new URL(param.request.url);
  var after = url.searchParams.get("after");
  var before = url.searchParams.get("before");
  console.log("Loader is run");
  if (import.meta.env.SSR) {
    await Localized.loadMessages(params.lang, loadMessages);
  }
  return {
          data: Core__Option.map(RelayEnv.getRelayEnv(param.context, import.meta.env.SSR), (function (env) {
                  return EventsQuery_graphql.load(env, {
                              after: after,
                              before: before
                            }, "store-or-network", undefined, undefined);
                })),
          i18nLoaders: import.meta.env.SSR ? undefined : Caml_option.some(Localized.loadMessages(params.lang, loadMessages))
        };
}

var HydrateFallbackElement = JsxRuntime.jsx("div", {
      children: "Loading fallback..."
    });

var make = Events;

var $$default = Events;

var Component = Events;

export {
  EventsQuery ,
  make ,
  $$default as default,
  Component ,
  LoaderArgs ,
  loadMessages ,
  loader ,
  HydrateFallbackElement ,
}
/*  Not a pure module */
