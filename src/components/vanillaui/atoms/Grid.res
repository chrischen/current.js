
@genType @react.component
let make = (~cols: option<int>=?, ~rows: option<int>=?, ~className=?, ~children) => {
	let otherClasses = className->Option.map(s => " " ++ s)->Option.getOr("");
	let base = "grid gap-x-4 gap-y-4 xl:gap-x-6";
	switch((cols, rows)) {
		| (Some(cols), None | Some(_)) => <div className={base ++ " grid-cols-" ++ cols->Int.toString ++ otherClasses}>{children}</div>
		| (None, Some(rows)) => <div className={base ++ " grid-rows-" ++ rows->Int.toString ++ otherClasses}>{children}</div>
		| (None, None) => <div className={base ++ otherClasses}>{children}</div>
	}
}
