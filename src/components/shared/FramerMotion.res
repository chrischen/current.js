type css = {opacity?: float, scale?: float, originX?: float, originY?: float}
module Div = {
  @module("framer-motion") @scope("motion") @react.component
  external make: (
    ~className: string=?,
		~style: css=?,
    ~key: string=?,
    ~animate: css=?,
    ~initial: css=?,
    ~exit: css=?,
    ~children: React.element=?,
  ) => React.element = "div"
}
module Li = {
  @module("framer-motion") @scope("motion") @react.component
  external make: (
    ~className: string=?,
		~style: css=?,
    ~key: string=?,
    ~animate: css=?,
    ~initial: css=?,
    ~exit: css=?,
    ~children: React.element=?,
  ) => React.element = "li"
}

module AnimatePresence = {
  @module("framer-motion") @react.component
  external make: (~children: React.element) => React.element = "AnimatePresence"
}
