%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
module Fragment = %relay(`
  fragment Event_event on Event {
    title
    ... EventRsvps_event
  }
`)
@genType @react.component
let make = (~event) => {
  let { title, fragmentRefs } = Fragment.use(event)
  <div className="bg-white">
    <h1> {%raw("t`Event`")} </h1>
    <div
      className={Util.cx([
        "grid",
        "grid-cols-1",
        "gap-y-10",
        "sm:grid-cols-2",
        "gap-x-6",
        "lg:grid-cols-3",
        "xl:gap-x-8",
      ])}
    />
    {title->Option.getOr("[Title missing]")->React.string}
    <EventRsvps users=fragmentRefs />
  </div>
}

@genType
let default = make
