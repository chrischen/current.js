module LocaleButton = {
  type t = {locale: string, display: string}
  @genType @react.component
  let make = (~locale: t, ~path, ~active) => {
    let locPath = locale.locale == "en" ? "" : "/" ++ locale.locale
    switch active {
    | true => <span> {React.string(locale.display)} </span>
    | false =>
      <Util.Link to={locPath ++ path}>
        <span> {React.string(locale.display)} </span>
      </Util.Link>
    }
  }
}
let locales = [
  {LocaleButton.locale: "en", display: "english"},
  {locale: "ja", display: "日本語"},
]
@genType @react.component
let make = () => {
  let {i18n: {locale}} = Lingui.useLingui()
  let {pathname} = Router.useLocation()
  let basePath = pathname->String.replaceRegExp(Js.Re.fromString("^/" ++ locale), "")

  locales
  ->Belt.Array.mapWithIndex((index, loc) => {
    <React.Fragment key=loc.locale>
      {index > 0 ? " | "->React.string : React.null}
      <LocaleButton locale={loc} path={basePath} active={loc.locale == locale} />
    </React.Fragment>
  })
  ->React.array
}

@genType
let default = make
