%%raw("import { t } from '@lingui/macro'")

@genType
@react.component
let make = () => {
	open Lingui.Util;
	<Layout.Container>
		{t`Page not found.`}
	</Layout.Container>
}
