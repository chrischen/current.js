%%raw("import { css, cx } from '@linaria/core'")
%%raw("import { t } from '@lingui/macro'")

let ts = Lingui.UtilString.t

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

module CreateLocationMutation = %relay(`
 mutation CreateLocationMutation(
    $connections: [ID!]!
    $input: CreateLocationInput!
  ) {
    createLocation(input: $input) {
      location @appendNode(connections: $connections, edgeTypeName: "LocationEdge") {
        __typename
        id
        name
        links
        address
      }
    }
  }
`)

@module("../layouts/appContext")
external sessionContext: React.Context.t<UserProvider.session> = "SessionContext"

@rhf
type inputs = {
  name: Zod.string_,
  address: Zod.string_,
  links: Zod.optional<Zod.string_>,
  details: Zod.optional<Zod.string_>,
}

let schema = Zod.z->Zod.object(
  (
    {
      name: Zod.z->Zod.string({required_error: ts`Name is required`})->Zod.String.min(1),
      address: Zod.z->Zod.string({required_error: ts`Address is required`})->Zod.String.min(1),
      links: Zod.z->Zod.string({})->Zod.optional,
      details: Zod.z->Zod.string({})->Zod.optional,
    }: inputs
  ),
)
@react.component
let make = (~onCancel) => {
  open Lingui.Util
  open Form
  let (commitMutationCreate, _) = CreateLocationMutation.use()

  let {
    register,
    handleSubmit,
    // watch,
    formState: {errors},
    // getFieldState,
    // setValue,
  } = useFormOfInputs(
    ~options={
      resolver: Resolver.zodResolver(schema),
      defaultValues: {},
    },
  )
  let onSubmit = (data: inputs) => {
    let connectionId = RescriptRelay.ConnectionHandler.getConnectionID(
      "client:root"->RescriptRelay.makeDataId,
      "CreateEvent_locations",
      (),
    )

    let links = data.links->Option.map(link => link->String.splitByRegExp(%re("/,[ ]+/"))->Array.reduce([], (acc, link) => {
      switch link {
        | Some(link) => acc->Array.concat([link])
        | None => acc
      }
    }))
    commitMutationCreate(
      ~variables={
        input: {
          name: data.name,
          address: data.address,
          links: ?links,
          details: ?data.details
        },
        connections: [connectionId],
      },
    )->RescriptRelay.Disposable.ignore
  }
  // let onSubmit = data => Js.log(data)

  <WaitForMessages>
    {() =>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid className="grid-cols-1">
          <FormSection title={t`Location`}>
            <div className="col-span-full">
              <Input
                label={t`Name`}
                id="name"
                name="name"
                placeholder={ts`Akabane Elementary School`}
                register={register(Name)}
              />
              <p>
                {switch errors.name {
                | Some({message: ?Some(message)}) => message
                | _ => ""
                }->React.string}
              </p>
            </div>
            <div className="sm:col-span-2">
              <Input
                label={t`Address`}
                id="address"
                name="address"
                register={register(Address)}
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                label={t`Maps link`}
                id="links"
                name="links"
                placeholder="https://maps.app.goo.gl/77FBSgrFRFAQrPrM8"
                register={register(Links)}
              />
            </div>
            <div className="col-span-full">
              <TextArea
                label={t`Details`}
                id="details"
                name="details"
                hint={t`Instructions or information that will apply to all events held at this location.`}
                register={register(Details)}
              />
            </div>
          </FormSection>
          <Form.Footer onCancel/>
        </Grid>
      </form>}
  </WaitForMessages>
}
