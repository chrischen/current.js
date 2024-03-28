// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Core__Option from "@rescript/core/src/Core__Option.mjs";
import * as RescriptRelay_Fragment from "rescript-relay/src/RescriptRelay_Fragment.mjs";
import * as GlobalQueryProvider_viewer_graphql from "../../__generated__/GlobalQueryProvider_viewer_graphql.mjs";

var convertFragment = GlobalQueryProvider_viewer_graphql.Internal.convertFragment;

function use(fRef) {
  return RescriptRelay_Fragment.useFragment(GlobalQueryProvider_viewer_graphql.node, convertFragment, fRef);
}

function useOpt(fRef) {
  return RescriptRelay_Fragment.useFragmentOpt(fRef !== undefined ? Caml_option.some(Caml_option.valFromOption(fRef)) : undefined, GlobalQueryProvider_viewer_graphql.node, convertFragment);
}

var Fragment = {
  Types: undefined,
  Operation: undefined,
  convertFragment: convertFragment,
  use: use,
  useOpt: useOpt
};

var context = React.createContext(undefined);

var make = context.Provider;

var Provider = {
  make: make
};

function useViewer() {
  var globalQuery = React.useContext(context);
  return Core__Option.getOr(Core__Option.map(globalQuery, (function (q) {
                    return use(q);
                  })), {
              user: undefined
            });
}

function GlobalQuery$Viewer(props) {
  var globalQuery = React.useContext(context);
  var viewer = Core__Option.getOr(Core__Option.map(globalQuery, (function (q) {
              return use(q);
            })), {
        user: undefined
      });
  return props.children(viewer);
}

var Viewer = {
  make: GlobalQuery$Viewer
};

export {
  Fragment ,
  context ,
  Provider ,
  useViewer ,
  Viewer ,
}
/* context Not a pure module */
