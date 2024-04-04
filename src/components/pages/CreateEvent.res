%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")

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

@module("react-router-dom")
external useLoaderData: unit => WaitForMessages.data<promise<string>> = "useLoaderData"

@module("../layouts/appContext")
external sessionContext: React.Context.t<UserProvider.session> = "SessionContext"

@rhf
type inputs = {
  title: string,
  location: string,
  startDate: string,
  endTime: string,
  details?: string,
}

@genType @react.component
let make = () => {
  open Lingui.Util
  open Form
  let (commitMutationCreate, isMutationInFlight) = CreateEventMutation.use()
  let (s, setState) = React.useState(() => "")
  let data = useLoaderData()
  let now = Js.Date.make()
  let currentISODate =
    Js.Date.fromFloat(
      now->Js.Date.getTime -. now->Js.Date.getTimezoneOffset *. 60000.,
    )->Js.Date.toISOString->String.slice(~start=0, ~end=16)
  let {register, handleSubmit, watch, formState, getFieldState, setValue} = useFormOfInputs(
    ~options={
      defaultValues: {
        title: "",
        location: "",
        startDate: currentISODate,
        endTime: "03:30",
        details: "",
      },
    },
  )
  // let watchDate = watch(Date);
  let watchTitle = watch(Title)

  let onSubmit_ = _ => {
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
  let onSubmit = data => Js.log(data)

  <WaitForMessages>
    {() =>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid className="grid-cols-1">
          <FormSection title={t`Details specific to this event on the specified date and time.`}>
            <div className="col-span-full">
              <Input label={t`Title`} id="title" name="title" register={register(Title)} />
            </div>
            <div className="sm:col-span-2">
              <Input
                label={t`Location`} id="location" name="location" register={register(Location)}
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                label={t`Date and Time`}
                type_="datetime-local"
                id="startDate"
                name="startDate"
                register={register(StartDate)}
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                label={t`Date and Time`}
                type_="time"
                id="endTime"
                name="endTime"
                register={register(EndTime)}
              />
            </div>
            <div className="col-span-full">
              <TextArea
                label={t`Details`}
                id="details"
                name="details"
                hint={t`Any details from the location will already be included. Mention any additional event-specific instructions, rules, or details.`}
                register={register(Details)}
              />
            </div>
          </FormSection>
          <Form.Footer />
        </Grid>
      </form>}
  </WaitForMessages>
}
