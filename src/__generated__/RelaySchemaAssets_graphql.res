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
  description?: string,
  endDate?: Util.Datetime.t,
  location?: string,
  startDate?: Util.Datetime.t,
  title?: string,
}

@live
and input_CreateEventInput_nullable = {
  description?: Js.Null.t<string>,
  endDate?: Js.Null.t<Util.Datetime.t>,
  location?: Js.Null.t<string>,
  startDate?: Js.Null.t<Util.Datetime.t>,
  title?: Js.Null.t<string>,
}
