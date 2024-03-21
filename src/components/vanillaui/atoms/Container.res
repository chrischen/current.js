

@genType @react.component
let make = (~className=?, ~children) => {
	let otherClasses = className->Option.map(s => " " ++ s)->Option.getOr("");
	<div className={"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ++ otherClasses}>{children}</div>
}
