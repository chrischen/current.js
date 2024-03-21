// %%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
open Lingui.Util;

@genType @react.component
let make = (~onJoin, ~onLeave, ~joined: bool) => {
  joined
    ? <>
        <a href="#" onClick={onLeave}>
          {"⭠"->React.string}
          {t`leave event`}
        </a>
      </>
    : <a href="#" onClick={onJoin}>
        {"⭢"->React.string}
        {t`join event`}
      </a>
}

// let loadMessages = lang => {
//   let messages = switch lang {
//   | "ja" => Lingui.import("../../locales/ja/organisms/ViewerRsvpStatus.mjs")
//   | _ => Lingui.import("../../locales/en/organisms/ViewerRsvpStatus.mjs")
//   }->Promise.thenResolve(messages => {
//     Lingui.i18n.load(lang, messages["messages"])
//   })
//   [messages]
// }

@genType
let default = make
