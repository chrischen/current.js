%%raw("import { css, cx } from '@linaria/core'")
module LayoutContainer = {
  let style = %raw("css`
        @apply container mx-auto px-4 sm:px-6 lg:px-8;
      `")
  /* let make = (~children) => %raw("<div className={LayoutContainer.style}>{Props.children}</div>") */
  @react.component
  let make = (~children) => <div className={style}> {children} </div>
}


@genType @react.component
let make = () => {
  <div>
    <header>
      <nav>
        <div>
          <a href="/">
            <span> {React.string("Racquet League")} </span>
          </a>
        </div>
      </nav>
    </header>
  </div>
}

@genType
let default = make
