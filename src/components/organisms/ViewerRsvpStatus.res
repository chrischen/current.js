// %%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")

@genType @react.component
let make = (~onJoin, ~onLeave, ~joined: bool) => {
  joined
    ? <>
        <a href="#" onClick={onLeave}> {"→ "->React.string}{%raw("t`Leave event`")} </a>
        {React.string(" ")}
        <em> {%raw("t`You are going to this event`")} </em>
      </>
    : <a href="#" onClick={onJoin}> {%raw("t`Join event`")} </a>
}

let loadMessages = lang => {
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
