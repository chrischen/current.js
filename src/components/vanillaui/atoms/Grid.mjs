// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Core__Option from "@rescript/core/src/Core__Option.mjs";
import * as JsxRuntime from "react/jsx-runtime";

function Grid(props) {
  var children = props.children;
  var rows = props.rows;
  var cols = props.cols;
  var otherClasses = Core__Option.getOr(Core__Option.map(props.className, (function (s) {
              return " " + s;
            })), "");
  var base = "grid gap-x-4 gap-y-4 xl:gap-x-6";
  if (cols !== undefined) {
    return JsxRuntime.jsx("div", {
                children: children,
                className: base + " grid-cols-" + cols.toString() + otherClasses
              });
  } else if (rows !== undefined) {
    return JsxRuntime.jsx("div", {
                children: children,
                className: base + " grid-rows-" + rows.toString() + otherClasses
              });
  } else {
    return JsxRuntime.jsx("div", {
                children: children,
                className: base + otherClasses
              });
  }
}

var make = Grid;

export {
  make ,
}
/* react/jsx-runtime Not a pure module */
