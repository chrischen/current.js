// Generated by ReScript, PLEASE EDIT WITH CARE

import * as LoginLink from "../molecules/LoginLink.res.mjs";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as GlobalQuery from "../shared/GlobalQuery.res.mjs";
import * as JsxRuntime from "react/jsx-runtime";

import { t } from '@lingui/macro'
;

function ViewerRsvpStatus(props) {
  var viewer = GlobalQuery.useViewer();
  var match = viewer.user;
  if (match !== undefined) {
    if (props.joined) {
      return JsxRuntime.jsx(JsxRuntime.Fragment, {
                  children: Caml_option.some(JsxRuntime.jsxs("a", {
                            children: [
                              "⭠",
                              t`leave event`
                            ],
                            href: "#",
                            onClick: props.onLeave
                          }))
                });
    } else {
      return JsxRuntime.jsxs("a", {
                  children: [
                    "⭢",
                    t`join event`
                  ],
                  href: "#",
                  onClick: props.onJoin
                });
    }
  } else {
    return JsxRuntime.jsxs(JsxRuntime.Fragment, {
                children: [
                  JsxRuntime.jsx("em", {
                        children: t`login to join the event`
                      }),
                  " ",
                  JsxRuntime.jsx(LoginLink.make, {})
                ]
              });
  }
}

var make = ViewerRsvpStatus;

var $$default = ViewerRsvpStatus;

export {
  make ,
  $$default as default,
}
/*  Not a pure module */
