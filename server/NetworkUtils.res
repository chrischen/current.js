@bs.val external dev: bool = "import.meta.env.DEV";
@bs.val external apiEndpoint: option<string> = "import.meta.env.VITE_API_ENDPOINT";

// This is a simple example of how one could leverage `preloadAsset` to preload
// things from the GraphQL response. This should live inside of the
// (comprehensive) example application we're going to build eventually.
let preloadFromResponse = (part: Js.Json.t, ~preloadAsset: RelayRouter__Types.preloadAssetFn) => {
  switch part->Js.Json.decodeObject {
  | None => ()
  | Some(obj) =>
    switch obj->Dict.get("extensions") {
    | None => ()
    | Some(extensions) =>
      switch extensions->Js.Json.decodeObject {
      | None => ()
      | Some(extensions) =>
        extensions
        ->Dict.get("preloadableImages")
        ->Option.map(images =>
          images
          ->Js.Json.decodeArray
          ->Option.getWithDefault([])
          ->Array.filterMap(item => item->Js.Json.decodeString)
        )
        ->Option.getWithDefault([])
        ->Array.forEach(imgUrl => {
          preloadAsset(~priority=RelayRouter.Types.Default, RelayRouter.Types.Image({url: imgUrl}))
        })
      }
    }
  }
}

module OptionArray = {
  let sequence: array<option<'a>> => option<array<'a>> = xs => {
    Some(xs->Array.filterMap(x => x))
  }
}

external unsafeMergeJson: (@as(json`{}`) _, Js.Json.t, Js.Json.t) => Js.Json.t = "Object.assign"

module GraphQLIncrementalResponse = {
  type t<'a> = {incremental: array<'a>, hasNext: bool}
}

module GraphQLResponse = {
  type data = {.}
  type t<'a> = Incremental(GraphQLIncrementalResponse.t<'a>) | Response('a)

  let mapIncrementalWithDefault: (
    t<'a>,
    GraphQLIncrementalResponse.t<'a> => array<'b>,
    'a => array<'b>,
  ) => array<'b> = (t, withIncremental, default) => {
    switch t {
    | Incremental(incremental) => withIncremental(incremental)
    | Response(json) => default(json)
    }
  }
  let fromIncremental = data => Incremental(data)
  let makeResponse = data => Response(data)

  // Use parser to parse fully type-safe response
  let parse:
    type a. (Js.Json.t, Js.Json.t => option<a>) => option<t<a>> =
    (json, parseFn) =>
      switch json->Js.Json.decodeObject {
      | Some(dict) =>
        switch dict->Js.Dict.get("incremental") {
        | Some(data) =>
          switch data->Js.Json.decodeArray {
          | Some(arrayData) =>
            arrayData
            ->Array.map(parseFn)
            ->OptionArray.sequence
            ->Option.flatMap(data => Some(
              Incremental({
                incremental: data,
                hasNext: dict
                ->Js.Dict.get("hasNext")
                ->Option.mapWithDefault(false, v =>
                  v->Js.Json.decodeBoolean->Option.mapWithDefault(false, v => v)
                ),
              }),
            ))
          | None => {
              let data = parseFn(json)
              switch data {
              | Some(data) => Some(Response(data))
              | None => None
              }
            }
          }
        | None => {
            let data = parseFn(json)
            switch data {
            | Some(data) => Some(Response(data))
            | None => None
            }
          }
        }
      | None => None
      }

  // Partially parse response
  let fromJson: Js.Json.t => t<'a> = json =>
    switch json->Js.Json.decodeObject {
    | Some(dict) =>
      switch dict->Js.Dict.get("incremental") {
      | Some(data) =>
        switch data->Js.Json.decodeArray {
        | Some(arrayData) =>
          Incremental({
            incremental: arrayData,
            hasNext: dict
            ->Js.Dict.get("hasNext")
            ->Option.mapWithDefault(false, v =>
              v->Js.Json.decodeBoolean->Option.mapWithDefault(false, v => v)
            ),
          })
        | None => Response(json)
        }
      | None => Response(json)
      }
    | None => Response(json)
    }
}

module RelayDeferResponse = {
  type t<'a> = array<'a>

  // Type safe conversion from a GraphQL spec response
  let fromIncrementalResponse: GraphQLIncrementalResponse.t<{..} as 'a> => t<{..} as 'a> = ({
    incremental,
    hasNext,
  }) => {
    incremental->Array.mapWithIndex((data, i) => {
      let hasNext = i === incremental->Array.length - 1 ? hasNext : true

      Object.assign(data, {"hasNext": hasNext, "extensions": {"is_final": !hasNext}})
    })
  }

  external toJson: 'a => Js.Json.t = "%identity"

  // Not type safe conversion due to use of Json.t and object merging
  let fromJsonIncrementalResponse: GraphQLIncrementalResponse.t<Js.Json.t> => array<Js.Json.t> = ({
    incremental,
    hasNext,
  }) => {
    incremental->Array.mapWithIndex((data, i) => {
      let hasNext = i === incremental->Array.length - 1 ? hasNext : true

      unsafeMergeJson(data, {"hasNext": hasNext, "extensions": {"is_final": !hasNext}}->toJson)
    })
  }
}

// Not type safe conversion of GraphQL spec defer response to Relay-compatible
// version
let adaptJsonIncrementalResponseToRelay: Js.Json.t => array<Js.Json.t> = part =>
  part
  ->GraphQLResponse.fromJson
  ->GraphQLResponse.mapIncrementalWithDefault(
    RelayDeferResponse.fromJsonIncrementalResponse,
    part => [part],
  )

/* type test = {
  test: bool
}
let adaptIncrementalResponseToRelay: Js.Json.t => option<array<{.. } as 'a>> = part =>
  part
  ->GraphQLResponse.parse(json => Some({"test": true}))
  ->Option.map(GraphQLResponse.mapIncrementalWithDefault(_,
    x => x->(x => x->RelayDeferResponse.fromIncrementalResponse),
    part => [part],
  )) */

// The client and server fetch query are currently copied, but one could easily
// set them up so that they use the same base, and just take whatever config
// they need.
let makeFetchQuery = () =>
  RelaySSRUtils.makeClientFetchFunction((sink, operation, variables, _cacheConfig, _uploads) => {
    open RelayRouter.NetworkUtils

    fetch(
      dev ? apiEndpoint->Option.getWithDefault("http://localhost:4555/graphql") : "/graphql",
      {
        "method": "POST",
        "headers": Js.Dict.fromArray([("content-type", "application/json")]),
        "body": {"query": operation.text, "variables": variables}
        ->Js.Json.stringifyAny
        ->Option.getWithDefault(""),
      },
    )
    ->Promise.then(r => {
      r->getChunks(
        ~onNext=part => {
          /* part->preloadFromResponse(~preloadAsset) */
          part->adaptJsonIncrementalResponseToRelay->Array.map(sink.next)->ignore
        },
        ~onError=err => {
          sink.error(err)
        },
        ~onComplete=() => {
          sink.complete()
        },
      )
    })
    ->ignore

    None
  })

let makeServerFetchQuery = (~onQuery): /* ~preloadAsset, */
RescriptRelay.Network.fetchFunctionObservable => {
  RelaySSRUtils.makeServerFetchFunction(onQuery, (
    sink,
    operation,
    variables,
    _cacheConfig,
    _uploads,
  ) => {
    open RelayRouter.NetworkUtils

    fetchServer(
      apiEndpoint->Option.getWithDefault("http://localhost:4555/graphql"),
      {
        "method": "POST",
        "headers": Js.Dict.fromArray([("content-type", "application/json")]),
        "body": {"query": operation.text, "variables": variables}
        ->Js.Json.stringifyAny
        ->Option.getWithDefault(""),
      },
    )
    ->Promise.then(r => {
      r->getChunks(
        ~onNext=part => {
          /* part->preloadFromResponse(~preloadAsset) */
          part->adaptJsonIncrementalResponseToRelay->Array.map(sink.next)->ignore
        },
        ~onError=err => {
          sink.error(err)
        },
        ~onComplete=() => {
          sink.complete()
        },
      )
    })
    ->Promise.catch(e => {
      Promise.resolve(e->Js.Exn.asJsExn->Option.map(sink.error)->ignore)
    })
    ->ignore

    None
  })
}
