type streamedEntry = {
  id: string,
  response: option<Js.Json.t>,
  final: option<bool>,
}

module RelayReplaySubject: {
  type t

  @module("relay-runtime") @new
  external make: unit => t = "ReplaySubject"

  @send
  external complete: t => unit = "complete"

  @send
  external error: (t, Js.Exn.t) => unit = "error"

  @send
  external next: (t, Js.Json.t) => unit = "next"

  @send
  external subscribe: (
    t,
    RescriptRelay.Observable.observer<'response>,
  ) => RescriptRelay.Observable.subscription = "subscribe"

  @send
  external unsubscribe: t => unit = "unsubscribe"

  @send
  external getObserverCount: t => int = "getObserverCount"

  let applyPayload: (t, streamedEntry) => unit
}
