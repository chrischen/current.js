%%raw("import { t } from '@lingui/macro'")
open Lingui.Util

@react.component
let make = (~className: option<string>=?) => {
  <a ?className href="/oauth-login"> {t`login with Line`} </a>
}
