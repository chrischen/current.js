module Switch = {
  @live @module("@headlessui/react") @react.component @live
    external make: (~className: string=?, ~children: 'children, ~checked: bool=?, ~onChange: JsxEventU.Form.t => unit=?) => React.element =
    "Switch"

  // @module("@headlessui/react")
  //   external make: (PervasivesU.JsxDOM.domProps) => React.element =
  //   "Switch"
  module Group = {
    @module("@headlessui/react") @scope("Switch") @react.component
    external make: (~\"as": 'asType=?, ~className: string=?, ~children: 'children) => React.element =
      "Group"
  }

  module Label = {
    @module("@headlessui/react") @scope("Switch") @react.component
    external make: (~\"as": 'asType=?, ~className: string=?, ~children: 'children) => React.element =
      "Label"
  }
}
