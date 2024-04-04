// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Lingui from "../../locales/Lingui.mjs";
import * as Localized from "../shared/i18n/Localized.mjs";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as CreateEvent from "../pages/CreateEvent.mjs";
import * as ReactRouterDom from "react-router-dom";

var isEmptyObj = (obj => Object.keys(obj).length === 0 && obj.constructor === Object);

function parseData(json) {
  if (isEmptyObj(json)) {
    return "Empty";
  } else {
    return {
            TAG: "Promise",
            _0: json
          };
  }
}

var LoaderArgs = {};

function loadMessages(lang) {
  var tmp = lang === "ja" ? import("../../locales/src/components/pages/CreateEvent/ja") : import("../../locales/src/components/pages/CreateEvent/en");
  return [tmp.then(function (messages) {
                React.startTransition(function () {
                      Lingui.i18n.load(lang, messages.messages);
                    });
              })];
}

async function loader(param) {
  var params = param.params;
  if (import.meta.env.SSR) {
    await Localized.loadMessages(params.lang, loadMessages);
  }
  return ReactRouterDom.defer({
              i18nLoaders: import.meta.env.SSR ? undefined : Caml_option.some(Localized.loadMessages(params.lang, loadMessages))
            });
}

var Component = CreateEvent.make;

export {
  isEmptyObj ,
  parseData ,
  Component ,
  LoaderArgs ,
  loadMessages ,
  loader ,
}
/* react Not a pure module */
