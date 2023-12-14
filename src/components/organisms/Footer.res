%%raw("import { css, cx } from '@linaria/core'")
module Root = {
  let style = %raw("css`

    border-color: rgba(127, 127, 127, 0.3);
    @apply border-t py-3 mt-3;
    &> div {
      @apply sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs leading-5;
      h3 {
        @apply text-xl mb-2;
      }
      ul {
        @apply list-none;
      }

    }
    `")
}

@genType @react.component
let make = () => {
  <div className={Root.style}>
    <Nav.LayoutContainer>
      <div>
			{
				React.string("Copyright the Racquet League Club")
			}
			</div>
    </Nav.LayoutContainer>
  </div>
}

@genType
let default = make
