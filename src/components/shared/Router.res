module Outlet = {
  @module("react-router-dom") @react.component
  external make: unit => React.element = "Outlet"
}

module SearchParams = {
  type t;

  @send external get: (t, string) => option<string> = "get";
}
module URL = {
  type t = {
    searchParams: SearchParams.t,
  };

  @new external make: string => t = "URL";
}
module RouterRequest = {
  type t = {
    url: string,
  }
}
