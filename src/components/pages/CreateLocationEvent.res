%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")

let ts = Lingui.UtilString.t
module Mutation = %relay(`
 mutation CreateLocationEventMutation(
    $connections: [ID!]!
    $input: CreateEventInput!
  ) {
    createEvent(input: $input) {
      event @appendNode(connections: $connections, edgeTypeName: "EventEdge") {
        __typename
        id
        title
        startDate
        endDate
      }
    }
  }
`)

module Fragment = %relay(`
  fragment CreateLocationEvent_location on Location {
    id
    name
    details
  }
`)

@module("../layouts/appContext")
external sessionContext: React.Context.t<UserProvider.session> = "SessionContext"

@rhf
type inputs = {
  title: Zod.string_,
  maxRsvps: Zod.optional<Zod.number>,
  startDate: Zod.string_,
  endTime: Zod.string_,
  details: Zod.optional<Zod.string_>,
}

let schema = Zod.z->Zod.object(
  (
    {
      title: Zod.z->Zod.string({required_error: ts`Title is required`})->Zod.String.min(1),
      maxRsvps: Zod.z->Zod.number({})->Zod.optional,
      startDate: Zod.z->Zod.string({required_error: ts`Event date is required`})->Zod.String.min(1),
      endTime: Zod.z->Zod.string({required_error: ts`End time is required`})->Zod.String.min(5),
      details: Zod.z->Zod.string({})->Zod.optional,
    }: inputs
  ),
)

@react.component
let make = (~location) => {
  open Lingui.Util
  open Form
  let location = Fragment.use(location)
  let (commitMutationCreate, _) = Mutation.use()
  let navigate = Router.useNavigate()

  let {
    register,
    handleSubmit,
    formState: {errors},
    // getFieldState,
    setValue,
  } = useFormOfInputs(
    ~options={
      resolver: Resolver.zodResolver(schema),
      defaultValues: {},
    },
  )
  React.useEffect(() => {
    // @NOTE: Date.make runs an effect therefore cannot be part of the render
    let now = Js.Date.make()
    let currentISODate =
      Js.Date.fromFloat(now->Js.Date.getTime -. now->Js.Date.getTimezoneOffset *. 60000.)
      ->Js.Date.toISOString
      ->String.slice(~start=0, ~end=16)

    let currentDate = DateFns.parseISO(currentISODate)
    let defaultStartDate = currentDate->DateFns.formatWithPattern("yyyy-MM-dd'T'HH:00")

    let defaultEndTime =
      defaultStartDate
      ->DateFns.parseISO
      ->DateFns.addHours(2.0)
      ->DateFns.formatWithPattern("HH:mm")
    setValue(StartDate, Value(defaultStartDate))
    setValue(EndTime, Value(defaultEndTime))

    None
  }, [])

  let onSubmit = (data: inputs) => {
    let connectionId = RescriptRelay.ConnectionHandler.getConnectionID(
      "client:root"->RescriptRelay.makeDataId,
      "EventsListFragment_events",
      (),
    )

    let startDate = data.startDate->DateFns.parseISO
    let endDate = DateFns2.parse(data.endTime, "HH:mm", startDate)
    commitMutationCreate(
      ~variables={
        input: {
          title: data.title,
          maxRsvps: ?data.maxRsvps->Option.map(Float.toInt),
          details: data.details->Option.getOr(""),
          locationId: location.id,
          startDate: startDate->Util.Datetime.fromDate,
          endDate: endDate->Util.Datetime.fromDate,
        },
        connections: [connectionId],
      },
      ~onCompleted=(response, _errors) => {
        response.createEvent.event
        ->Option.map(event => navigate("/events/" ++ event.id, None))
        ->ignore
      },
    )->RescriptRelay.Disposable.ignore
  }
  // let onSubmit = data => Js.log(data)

  <FramerMotion.Div
    style={opacity: 0., y: -50.}
    initial={opacity: 0., scale: 1., y: -50.}
    animate={opacity: 1., scale: 1., y: 0.00}
    exit={opacity: 0., scale: 1., y: -50.}>
    <WaitForMessages>
      {() => <>
        <Grid className="grid-cols-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormSection
              title={t`${location.name->Option.getOr("?")} Event Details`}
              description={t`Details specific to this event on the specified date and time.`}>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <Input
                    label={t`Title`}
                    id="title"
                    name="title"
                    placeholder={ts`All Level Badminton`}
                    register={register(Title)}
                  />
                  <p>
                    {switch errors.title {
                    | Some({message: ?Some(message)}) => message
                    | _ => ""
                    }->React.string}
                  </p>
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
                <div className="sm:col-span-2">
                  <Input
                    label={t`Max participants`}
                    type_="text"
                    id="maxRsvps"
                    name="maxRsvps"
                    register={register(
                      MaxRsvps,
                      ~options={setValueAs: v => v == "" ? None : Some(Int.fromString(v))},
                    )}
                  />
                </div>
                <div className="col-span-full">
                  <TextArea
                    label={t`Location Details`}
                    id="location_details"
                    name="location_details"
                    hint={<Router.Link to="/locations/edit/">
                      {t`Edit the location to edit the details for this location.`}
                    </Router.Link>}
                    disabled=true
                    defaultValue={location.details->Option.getOr("")}
                  />
                </div>
                <div className="col-span-full">
                  <TextArea
                    label={t`Event Details`}
                    id="details"
                    name="details"
                    hint={t`Any details from the location will already be included. Mention any additional event-specific instructions, rules, or details.`}
                    register={register(Details)}
                  />
                </div>
              </div>
            </FormSection>
            <Form.Footer />
          </form>
        </Grid>
      </>}
    </WaitForMessages>
  </FramerMotion.Div>
}
