%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
/*module Fragment = %relay(`
  fragment Events_event on Event {
    ... Event_event
  }
`)*/
/*module Query = %relay(`
  query EventQuery {
    event(id: "1") {
      title
			... EventRsvps_event
		}
  }
`)*/
@genType @react.component
let make = (~events) => {
  //let { fragmentRefs } = Fragment.use(events)
  <div className="bg-white">
    <h1> {%raw("t`All Events`")} </h1>
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
    <EventsList events=events />
  </div>
}

@genType
let default = make
