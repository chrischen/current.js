%%raw("import { t } from '@lingui/macro'")
@genType @react.component
let make = () => {
  open Lingui.Util
  <WaitForMessages>
    {() => <Layout.Container> {t`Page not found.`} </Layout.Container>}
  </WaitForMessages>
}
