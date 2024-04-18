%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")

@genType @react.component
let make = () => {
  open Lingui.Util
  <WaitForMessages>
    {() =>
      <div className="border-t py-3 mt-3">
        <Layout.Container>
          <div className="grid grid-cols-1 gap-4 text-xs leading-5">
            {t`copyright the racquet league contributors`}
          </div>
        </Layout.Container>
      </div>}
  </WaitForMessages>
}

@genType
let default = make
