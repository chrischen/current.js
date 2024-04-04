%%raw("import { t } from '@lingui/macro'")

@react.component
let make = (~title: React.element, ~children) => {
  open Lingui.Util
  let ts = Lingui.UtilString.t
  <div className="border-b border-gray-900/10 pb-12">
    <h2 className="text-base font-semibold leading-7 text-gray-900"> {t`Details`} </h2>
    <p className="mt-1 text-sm leading-6 text-gray-600">
      {title}
    </p>
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    {children}
    </div>
  </div>
}
