/* @generated */
@@warning("-30")

@live @unboxed
type enum_RequiredFieldAction = 
  | NONE
  | LOG
  | THROW
  | FutureAddedValue(string)


@live @unboxed
type enum_RequiredFieldAction_input = 
  | NONE
  | LOG
  | THROW


@live
type rec input_CreateEventInput = {
  details?: string,
  endDate: Util.Datetime.t,
  locationId: string,
  startDate: Util.Datetime.t,
  title: string,
}

@live
and input_CreateEventInput_nullable = {
  details?: Js.Null.t<string>,
  endDate: Util.Datetime.t,
  locationId: string,
  startDate: Util.Datetime.t,
  title: string,
}

@live
and input_CreateLocationInput = {
  address: string,
  details?: string,
  links?: array<string>,
  name: string,
}

@live
and input_CreateLocationInput_nullable = {
  address: string,
  details?: Js.Null.t<string>,
  links?: Js.Null.t<array<string>>,
  name: string,
}
