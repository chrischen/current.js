// %%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")

@genType @react.component
let make = (~onJoin, ~onLeave, ~joined: bool) => {
  joined
    ? <>
        <em> {%raw("t`You are going to this event`")} </em>
        {React.string(" ")}
        <a onClick={onLeave}> {%raw("t`Leave event`")} </a>
      </>
    : <a onClick={onJoin}> {%raw("t`Join event`")} </a>
}

let getMessages = lang => {
  let messages = switch lang {
  | "jp" => Lingui.import("../../locales/jp/organisms/ViewerRsvpStatus.mjs")
  | _ => Lingui.import("../../locales/en/organisms/ViewerRsvpStatus.mjs")
  }->Promise.thenResolve(messages => {
    Lingui.i18n.load(lang, messages["messages"])
  })
  [messages]
}

@genType
let default = make
