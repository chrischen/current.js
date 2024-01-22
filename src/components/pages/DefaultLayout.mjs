// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as RelayEnv from "../../entry/RelayEnv.mjs";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Core__Option from "@rescript/core/src/Core__Option.mjs";
import * as ReactRouterDom from "react-router-dom";
import * as JsxRuntime from "react/jsx-runtime";
import * as RescriptRelay_Query from "rescript-relay/src/RescriptRelay_Query.mjs";
import * as NavigationMenu from "../ui/navigation-menu";
import DefaultTsx from "../layouts/default.tsx";
import * as DefaultLayoutQuery_graphql from "../../__generated__/DefaultLayoutQuery_graphql.mjs";

import { css, cx } from '@linaria/core'
;

import { t } from '@lingui/macro'
;

var convertVariables = DefaultLayoutQuery_graphql.Internal.convertVariables;

var convertResponse = DefaultLayoutQuery_graphql.Internal.convertResponse;

var convertWrapRawResponse = DefaultLayoutQuery_graphql.Internal.convertWrapRawResponse;

var use = RescriptRelay_Query.useQuery(convertVariables, DefaultLayoutQuery_graphql.node, convertResponse);

var useLoader = RescriptRelay_Query.useLoader(convertVariables, DefaultLayoutQuery_graphql.node, (function (prim) {
        return prim;
      }));

var usePreloaded = RescriptRelay_Query.usePreloaded(DefaultLayoutQuery_graphql.node, convertResponse, (function (prim) {
        return prim;
      }));

var $$fetch = RescriptRelay_Query.$$fetch(DefaultLayoutQuery_graphql.node, convertResponse, convertVariables);

var fetchPromised = RescriptRelay_Query.fetchPromised(DefaultLayoutQuery_graphql.node, convertResponse, convertVariables);

var retain = RescriptRelay_Query.retain(DefaultLayoutQuery_graphql.node, convertVariables);

var DefaultLayoutQuery = {
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

var make = NavigationMenu.MenuInstance;

var MenuInstance = {
  make: make
};

var make$1 = DefaultTsx;

var DefaultLayout = {
  make: make$1
};

function DefaultLayout$1(props) {
  var query = ReactRouterDom.useLoaderData();
  var match = usePreloaded(query);
  return JsxRuntime.jsx(make$1, {
              children: JsxRuntime.jsx(React.Suspense, {
                    children: Caml_option.some(JsxRuntime.jsx(ReactRouterDom.Outlet, {})),
                    fallback: "Loading"
                  }),
              fragmentRefs: match.fragmentRefs
            });
}

var LoaderArgs = {};

function loader(param) {
  new URL(param.request.url);
  return Core__Option.map(RelayEnv.getRelayEnv(param.context, import.meta.env.SSR), (function (env) {
                return DefaultLayoutQuery_graphql.load(env, undefined, "store-or-network", undefined, undefined);
              }));
}

var make$2 = DefaultLayout$1;

var $$default = DefaultLayout$1;

var Component = DefaultLayout$1;

export {
  DefaultLayoutQuery ,
  MenuInstance ,
  DefaultLayout ,
  make$2 as make,
  $$default ,
  $$default as default,
  Component ,
  LoaderArgs ,
  loader ,
}
/*  Not a pure module */