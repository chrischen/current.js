type locale = {
  locale: string,
  lang: string,
}
@module("react-router-dom")
external useLoaderData: unit => locale = "useLoaderData"

@genType @react.component
let make = () => {
  let data = useLoaderData()
  let locale = switch data.lang {
  | "ja" => Some("ja")
  | "en" => Some("en")
  | _ => None
  }
  open Router

  <Lingui.I18nProvider i18n=Lingui.i18n>
    {switch locale {
    | Some(locale) =>
      <ReactIntl2.IntlProvider locale timeZone="jst">
        <Outlet />
      </ReactIntl2.IntlProvider>
    | None => <NotFound />
    }}
  </Lingui.I18nProvider>
}
//
// @genType
// let default = make
