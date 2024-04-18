type locale = {
  locale: string,
  lang: string,
}
@module("react-router-dom")
external useLoaderData: unit => locale = "useLoaderData"

@genType @react.component
let make = () => {
  let data = useLoaderData();
  let locale = switch data.lang {
  | "ja" => "ja"
  | _ => "en"
  }
  open Router

  <Lingui.I18nProvider i18n=Lingui.i18n>
    <ReactIntl2.IntlProvider locale timeZone="jst">
      <Outlet />
    </ReactIntl2.IntlProvider>
  </Lingui.I18nProvider>
}
//
// @genType
// let default = make
