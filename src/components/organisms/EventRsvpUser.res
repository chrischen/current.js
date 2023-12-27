%%raw("import { css, cx } from '@linaria/core'")
/* %%raw("import Query, { QueryResponse } from '../shared/Query'") */
/* let clone = react["cloneElement"] */
module Fragment = %relay(`
  fragment EventRsvpUser_user on User {
    lineUsername
    rating
  }
`)

@genType @react.component
let make = (~user, ~highlight: bool = false) => {
  let user = Fragment.use(user)

  /* switch user.lineUsername {
  | Some(username) =>
    (username ++ " ... " ++ user.rating->Option.map(string_of_int)->Option.getWithDefault(""))
      ->React.string
  | None => React.string("")
  }*/
  let display = (user.lineUsername->Option.getOr("[Line username missing]") ++ " ... " ++ user.rating->Option.getOr(0)->string_of_int)->React.string
  switch(highlight) {
    | true => <strong>{display}</strong>
    | false => {display}
  }
}

@genType
let default = make
