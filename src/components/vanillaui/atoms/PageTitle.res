@genType @react.component
let make = (~children) => {
  <div className="mt-2 md:flex md:items-center md:justify-between">
    <div className="min-w-0 flex-1">
      <h1
        className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        {children}
      </h1>
    </div>
  </div>
}
