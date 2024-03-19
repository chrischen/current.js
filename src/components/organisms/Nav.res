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
        <div>
          <Util.Link to="/">
            <span> {React.string("Racquet League")} </span>
          </Util.Link>
          {React.string(" - ")}
          {viewer
          ->Option.flatMap(viewer =>
            viewer.user.lineUsername->Option.map(lineUsername =>
              <span> {React.string(lineUsername)} </span>
            )
          )
          ->Option.getOr(<a href="/login"> {React.string("Login")} </a>)}
          {React.string(" ")}
          <a href="/logout">{%raw("t`(Logout)`")}</a>
          {React.string(" ")}
          <LangSwitch />
        </div>
      </nav>
    </header>
  </div>
}

@genType
let default = make
