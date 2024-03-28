module Outlet = {
  @module("react-router-dom") @react.component
  external make: unit => React.element = "Outlet"
}

@module("react-router-dom")
external useParams: unit => Js.Json.t = "useParams"

type navOpts = {replace: bool}
type navigate = (string, option<navOpts>) => unit
@module("react-router-dom")
external useNavigate: unit => navigate = "useNavigate"

type t = {pathname: string}
@module("react-router-dom") external useLocation: unit => t = "useLocation"

module SearchParams = {
  type t

  @send external get: (t, string) => option<string> = "get"
}
module URL = {
  type t = {searchParams: SearchParams.t}

  @new external make: string => t = "URL"
}
module RouterRequest = {
  type t = {url: string}
}
@module("react-router-dom")
external defer: 'a => Js.Null.t<'a> = "defer"

module Await = {
  @module("react-router-dom") @react.component
  external make: (
    ~children: 'a => React.element,
    ~resolve: Js.Promise.t<'a>,
    ~errorElement: React.element,
  ) => React.element = "Await"
}

@module("react-router-dom")
external useAsyncValue: unit => 'a = "useAsyncValue"
