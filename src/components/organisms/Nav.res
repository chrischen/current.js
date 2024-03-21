%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")

module Fragment = %relay(`
  fragment Nav_user on Query {
    viewer {
      user {
        id
        lineUsername
      }
    }
  }
`)

module MenuInstance = {
  @module("../ui/navigation-menu") @react.component
  external make: unit => React.element = "MenuInstance"
}
@genType @react.component
let make = (~fragmentRefs) => {
  let {viewer} = Fragment.use(fragmentRefs)
  <div>
    <header>
      <nav>
        <Util.Link to="/">
          <span> {React.string("racquet league")} </span>
        </Util.Link>
        {React.string(" - ")}
        {viewer
        ->Option.flatMap(viewer =>
          viewer.user.lineUsername->Option.map(lineUsername => <>
            <span> {React.string(lineUsername)} </span>
            {React.string(" ")}
            <a href="/logout"> {%raw("t`(logout)`")} </a>
          </>)
        )
        ->Option.getOr(<a href="/login"> {React.string("login")} </a>)}
        {React.string(" ")}
        <LangSwitch />
      </nav>
    </header>
  </div>
}

@genType
let default = make
