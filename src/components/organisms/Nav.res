%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
open Lingui.Util


module Viewer = {
  @genType @react.component
  let make = (~viewer) => {
    // Uses the Query fragment directly
    // let viewer = GlobalQueryProvider.Fragment.use(viewer)

    // Uses the Query fragment from the global context
    let globalQuery = React.useContext(GlobalQueryProvider.context)
    let viewer = GlobalQueryProvider.Fragment.use(globalQuery->Option.getUnsafe)

    {
      viewer.user
      ->Option.flatMap(user =>
        user.lineUsername->Option.map(lineUsername => <>
          <span> {React.string(lineUsername)} </span>
          {React.string(" ")}
          <a href="/logout"> {t`(logout)`} </a>
        </>)
      )
      ->Option.getOr(<a href="/login"> {React.string("login")} </a>)
    }
  }
}

module MenuInstance = {
  @module("../ui/navigation-menu") @react.component
  external make: unit => React.element = "MenuInstance"
}

@genType @react.component
let make = (~viewer) => {
  <Localized.WaitForMessages>
    {() =>
      <div>
        <header>
          <nav>
            <Util.Link to="/">
              <span> {t`racquet league`} </span>
            </Util.Link>
            {React.string(" - ")}
            <React.Suspense fallback={React.string("...")}>
              <Viewer viewer />
            </React.Suspense>
            {React.string(" ")}
            <LangSwitch />
          </nav>
        </header>
      </div>}
  </Localized.WaitForMessages>
}

@genType
let default = make
