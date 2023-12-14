%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
module Fragment = %relay(`
  fragment EventRsvps_event on Event {
    users {
			...EventRsvpUser_user
		}
  }
`)
//@genType
//let default = make
@genType @react.component
let make = (~users) => {
  let {users} = Fragment.use(users)
  <div className="bg-white">
    <h1> {%raw("t`Users Attending`")} </h1>
    <div
      className={%raw(
        "cx('grid', 'grid-cols-1', 'gap-y-10', 'sm:grid-cols-2', 'gap-x-6', 'lg:grid-cols-3', 'xl:gap-x-8')"
      )}>
      <ul>
        {users
        ->Option.map(Array.map(_, user => {
            <li>
              <EventRsvpUser user=user.fragmentRefs />
            </li>
          })
        )
        ->Option.getOr([])
        ->React.array}
      </ul>
    </div>
  </div>
}

@genType
let default = make
