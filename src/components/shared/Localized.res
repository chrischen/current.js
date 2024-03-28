// type loaderData = {
//   messages: RescriptCore.Promise.t<{
//     "messages": Lingui.Messages.t,
//   }>
// }
type data<'a> = {
  data: 'a,
  i18nLoaders: promise<array<unit>>
};
@module("react-router-dom")
external useLoaderData: unit => data<'a> = "useLoaderData"

@genType @react.component
let make = (~children) => {
  //let { fragmentRefs } = Fragment.use(events)
  let query = useLoaderData()

  <Router.Await resolve={query.i18nLoaders} errorElement=React.string("Error loading translations")>
		{children}
  </Router.Await>
}


@genType
let loadMessages = (lang, loadMessages ) => {
  let lang = lang->Option.getOr("en")
  let messages = Js.Promise.all(loadMessages(lang))

  messages
}
