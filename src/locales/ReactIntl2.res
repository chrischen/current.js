open ReactIntl;
module IntlProvider = {
  @react.component @module("react-intl")
  external make: (
    ~locale: string=?,
    ~timeZone: string=?,
    ~formats: {..}=? /* TODO */,
    ~messages: Js.Dict.t<string>=?,
    ~defaultLocale: string=?,
    ~defaultFormats: {..}=? /* TODO */,
    ~textComponent: textComponent=?,
    ~initialNow: int=?,
    ~onError: string => unit=?,
    ~children: React.element,
  ) => React.element = "IntlProvider"
}
