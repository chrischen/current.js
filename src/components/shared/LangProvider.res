@module("react-router-dom")
external useLoaderData: unit => promise<unit> = "useLoaderData"

@genType @react.component
let make = () => {
  // let locale = switch lang {
  // | "ja" => "jp"
  // | _ => "us"
  // }
  open Router

  <Lingui.I18nProvider i18n=Lingui.i18n>
    <ReactIntl.IntlProvider locale="ja">
      <Outlet />
    </ReactIntl.IntlProvider>
  </Lingui.I18nProvider>
}
//
// @genType
// let default = make
