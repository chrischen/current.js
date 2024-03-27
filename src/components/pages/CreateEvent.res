%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")
// module EventQuery = %relay(`
//   query EventQuery($eventId: ID!, $after: String, $first: Int, $before: String) {
//     event(id: $eventId) {
//       __id
//       title
//       ...EventRsvps_event @arguments(after: $after, first: $first, before: $before)
//     }
//   }
// `)

module CreateEventMutation = %relay(`
 mutation CreateEventMutation(
    $connections: [ID!]!
    $input: CreateEventInput!
  ) {
    createEvent(input: $input) {
      event @appendNode(connections: $connections, edgeTypeName: "event") {
        id
        title
        startDate
        endDate
      }
    }
  }
`)

type data<'a> = Promise('a) | Empty

let isEmptyObj: 'a => bool = %raw(
  "obj => Object.keys(obj).length === 0 && obj.constructor === Object"
)
let parseData: 'a => data<'a> = json => {
  if isEmptyObj(json) {
    Empty
  } else {
    Promise(json)
  }
}

// module Test = {
//   @genType @react.component
//   let make = React.memo((~loaders) =>
//     <React.Suspense fallback={"loading lang..."->React.string}>
//       <Router.Await resolve={loaders} errorElement={React.string("Error loading translations")}>
//         {_ =>
//           <div
//             className={Util.cx([
//               "grid",
//               "grid-cols-2",
//               "gap-y-10",
//               "sm:grid-cols-4",
//               "gap-x-6",
//               "lg:grid-cols-6",
//               "xl:gap-x-8",
//             ])}>
//             {%raw("t`Title`")}
//           </div>}
//       </Router.Await>
//     </React.Suspense>
//   )
// }
@module("react-router-dom")
external useLoaderData: unit => Localized.data<promise<string>> = "useLoaderData"

@module("../layouts/appContext")
external sessionContext: React.Context.t<UserProvider.session> = "SessionContext"
@genType @react.component
let make = () => {
  let (commitMutationCreate, isMutationInFlight) = CreateEventMutation.use()
  let (s, setState) = React.useState(() => "")
  let data = useLoaderData()

  let onCreateEvent = _ => {
    let connectionId = RescriptRelay.ConnectionHandler.getConnectionID(
      "client:root"->RescriptRelay.makeDataId,
      "EventsListFragment_events",
      (),
    )
    commitMutationCreate(
      ~variables={
        input: {
          title: "Event title",
          description: "Descrition",
          startDate: Util.Datetime.fromDate(
            Date.makeWithYMDH(~year=2024, ~month=1, ~date=5, ~hours=18),
          ),
          endDate: Util.Datetime.fromDate(
            Date.makeWithYMDH(~year=2024, ~month=1, ~date=5, ~hours=21),
          ),
        },
        connections: [connectionId],
      },
    )->RescriptRelay.Disposable.ignore
  }
  Js.log("Render create event")

  <Localized.WaitForMessages>
  { () => 
    <div
      className={Util.cx([
        "grid",
        "grid-cols-2",
        "gap-y-10",
        "sm:grid-cols-4",
        "gap-x-6",
        "lg:grid-cols-6",
        "xl:gap-x-8",
      ])}>
      <a
        href="#"
        onClick={e => {
          e->JsxEventU.Mouse.preventDefault
          Js.log("set state")
          setState(_ => "en")
        }}
        className="cursor-pointer">
        {"Test"->React.string}
      </a>
      <form onSubmit=onCreateEvent>
        <label>
          {%raw("t`Title`")}
          {React.string(":")}
          <input type_="text" name="title" />
        </label>
        <label>
          {%raw("t`Start Date`")}
          {React.string(":")}
          <input type_="text" name="startDate" />
        </label>
        <label>
          {%raw("t`End Date`")}
          {React.string(":")}
          <input type_="text" name="endDate" />
        </label>
        <input type_="submit" value="Create" />
      </form>
    </div>
  }
  </Localized.WaitForMessages>
}

@genType
let default = make

@genType
let \"Component" = make

type params = {lang: option<string>}
module LoaderArgs = {
  type t = {
    context?: RelayEnv.context,
    params: params,
    request: Router.RouterRequest.t,
  }
}
let loadMessages = lang => {
  let messages = switch lang {
  | "ja" => Lingui.import("../../locales/src/components/pages/CreateEvent/ja")
  | _ => Lingui.import("../../locales/src/components/pages/CreateEvent/en")
  }->Promise.thenResolve(messages =>
    Util.startTransition(() => Lingui.i18n.load(lang, messages["messages"]))
  )

  [messages]
  // ->Array.concat(EventRsvps.loadMessages(lang))
  // ->Array.concat(ViewerRsvpStatus.loadMessages(lang))
}
@genType
let loader = async ({?context, params, request}: LoaderArgs.t) => {
  let url = request.url->Router.URL.make
  let after = url.searchParams->Router.SearchParams.get("after")
  let before = url.searchParams->Router.SearchParams.get("before")

  (RelaySSRUtils.ssr ? Some(await Localized.loadMessages(params.lang, loadMessages)) : None)->ignore
  Router.defer({
    Localized.data: None,
    // Localized.i18nLoaders: Localized.loadMessages(params.lang, loadMessages),
    i18nLoaders: ?(
      RelaySSRUtils.ssr ? None : Some(Localized.loadMessages(params.lang, loadMessages))
    ),

    // i18nData: ?(RelaySSRUtils.ssr ? Some(await Localized.loadMessages(params.lang, loadMessages)): None)
  })
  // If ASYNC on BOTH, server will send fallback and hydrates immediately
  // on client with same fallback
  //
  // IF AWAIT on client, client and loader is not ready by hydration, will render HydrateFallback which is never
  // rendered by SERVER, always causing hydration mismatch
  //
  // If hydrate=true, partialHydration feature works with AWAIT on client loader
  //
  //IF AWAIT on SERVER, ASYNC on CLIENT, server will block until loader is done to return result, client hydrates without triggering Suspense fallbacks
  //
}
// @genType
// let \"HydrateFallback" = <div> {React.string("Loading fallback...")} </div>
// %raw("loader.hydrate = true")
