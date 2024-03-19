%%raw("import { css, cx } from '@linaria/core'")

@genType @react.component
let make = () => {
  <div className="border-t py-3 mt-3">
      <div className="grid grid-cols-1 gap-4 text-xs leading-5">
			{
				React.string("Copyright the Racquet League Club")
			}
			</div>
  </div>
}

@genType
let default = make
