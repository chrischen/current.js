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
type rec input_CreateJobInput = {
  attempts: int,
  form: input_FormInput,
  interval: int,
  time: RescriptRelay.any,
}

@live
and input_CreateJobInput_nullable = {
  attempts: int,
  form: input_FormInput_nullable,
  interval: int,
  time: RescriptRelay.any,
}

@live
and input_FormInput = {
  date: RescriptRelay.any,
  endTime: int,
  field: string,
  shop: string,
  startTime: int,
}

@live
and input_FormInput_nullable = {
  date: RescriptRelay.any,
  endTime: int,
  field: string,
  shop: string,
  startTime: int,
}
