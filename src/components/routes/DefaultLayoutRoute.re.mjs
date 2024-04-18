// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Layout from "../shared/Layout.re.mjs";
import * as Lingui from "../../locales/Lingui.re.mjs";
import * as RelayEnv from "../../entry/RelayEnv.re.mjs";
import * as Localized from "../shared/i18n/Localized.re.mjs";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Core__Option from "@rescript/core/src/Core__Option.re.mjs";
import * as DefaultLayout from "../pages/DefaultLayout.re.mjs";
import * as ReactRouterDom from "react-router-dom";
import * as JsxRuntime from "react/jsx-runtime";
import * as DefaultLayoutQuery_graphql from "../../__generated__/DefaultLayoutQuery_graphql.re.mjs";

import { css, cx } from '@linaria/core'
;

import { t } from '@lingui/macro'
;

function loadMessages(lang) {
  var tmp = lang === "ja" ? import("../../locales/src/components/pages/DefaultLayout.re/ja") : import("../../locales/src/components/pages/DefaultLayout.re/en");
  return [tmp.then(function (messages) {
                React.startTransition(function () {
                      Lingui.i18n.load(lang, messages.messages);
                    });
              })];
}

var LoaderArgs = {};

async function loader(param) {
  return ReactRouterDom.defer({
              data: Core__Option.map(RelayEnv.getRelayEnv(param.context, import.meta.env.SSR), (function (env) {
                      return DefaultLayoutQuery_graphql.load(env, undefined, "store-or-network", undefined, undefined);
                    })),
              i18nLoaders: Caml_option.some(Localized.loadMessages(param.params.lang, loadMessages))
            });
}

var HydrateFallbackElement = JsxRuntime.jsx(Layout.Container.make, {
      children: "Loading fallback..."
    });

var Component = DefaultLayout.make;

export {
  Component ,
  loadMessages ,
  LoaderArgs ,
  loader ,
  HydrateFallbackElement ,
}
/*  Not a pure module */
