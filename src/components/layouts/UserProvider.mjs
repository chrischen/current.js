// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as AppContext from "./appContext";
import * as JsxRuntime from "react/jsx-runtime";
import * as RescriptRelay_Fragment from "rescript-relay/src/RescriptRelay_Fragment.mjs";
import * as UserProvider_user_graphql from "../../__generated__/UserProvider_user_graphql.mjs";

var make = AppContext.SessionContext.Provider;

var SessionContextProvider = {
  make: make
};

var convertFragment = UserProvider_user_graphql.Internal.convertFragment;

function use(fRef) {
  return RescriptRelay_Fragment.useFragment(UserProvider_user_graphql.node, convertFragment, fRef);
}

function useOpt(fRef) {
  return RescriptRelay_Fragment.useFragmentOpt(fRef !== undefined ? Caml_option.some(Caml_option.valFromOption(fRef)) : undefined, UserProvider_user_graphql.node, convertFragment);
}

var Fragment = {
  Types: undefined,
  Operation: undefined,
  convertFragment: convertFragment,
  use: use,
  useOpt: useOpt
};

function UserProvider$UserProvider(props) {
  var match = use(props.fragmentRefs);
  return JsxRuntime.jsx(make, {
              children: props.children,
              value: {
                viewer: match.viewer
              }
            });
}

var UserProvider = {
  make: UserProvider$UserProvider
};

export {
  SessionContextProvider ,
  Fragment ,
  UserProvider ,
}
/* make Not a pure module */
