%%raw("import { css, cx } from '@linaria/core'")

@variadic @val external cx: array<string> => string = "cx"

module Container = {
  let style = Util.cx(["container","mx-auto","px-4","sm:px-6","lg:px-8"])
  @genType @react.component
  let make = (~children, ~className=?) =>
    <div
      className={switch className {
      | Some(className) => cx([style, className])
      | None => style
      }}>
      {children}
    </div>
}
