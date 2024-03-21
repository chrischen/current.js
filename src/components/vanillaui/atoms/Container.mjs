// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Core__Option from "@rescript/core/src/Core__Option.mjs";
import * as JsxRuntime from "react/jsx-runtime";

function Container(props) {
  var otherClasses = Core__Option.getOr(Core__Option.map(props.className, (function (s) {
              return " " + s;
            })), "");
  return JsxRuntime.jsx("div", {
              children: props.children,
              className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" + otherClasses
            });
}

var make = Container;

export {
  make ,
}
/* react/jsx-runtime Not a pure module */
