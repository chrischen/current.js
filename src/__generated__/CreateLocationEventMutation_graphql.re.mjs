// Generated by ReScript, PLEASE EDIT WITH CARE
/* @generated */

import * as Util from "../components/shared/Util.re.mjs";
import * as RescriptRelay from "rescript-relay/src/RescriptRelay.re.mjs";

var Types = {};

var variablesConverter = {"createEventInput":{"startDate":{"c":"Util.Datetime"},"endDate":{"c":"Util.Datetime"}},"__root":{"input":{"r":"createEventInput"}}};

var variablesConverterMap = {
  "Util.Datetime": Util.Datetime.serialize
};

function convertVariables(v) {
  return RescriptRelay.convertObj(v, variablesConverter, variablesConverterMap, undefined);
}

var wrapResponseConverter = {"__root":{"createEvent_event_startDate":{"c":"Util.Datetime"},"createEvent_event_endDate":{"c":"Util.Datetime"}}};

var wrapResponseConverterMap = {
  "Util.Datetime": Util.Datetime.serialize
};

function convertWrapResponse(v) {
  return RescriptRelay.convertObj(v, wrapResponseConverter, wrapResponseConverterMap, null);
}

var responseConverter = {"__root":{"createEvent_event_startDate":{"c":"Util.Datetime"},"createEvent_event_endDate":{"c":"Util.Datetime"}}};

var responseConverterMap = {
  "Util.Datetime": Util.Datetime.parse
};

function convertResponse(v) {
  return RescriptRelay.convertObj(v, responseConverter, responseConverterMap, undefined);
}

var Internal = {
  variablesConverter: variablesConverter,
  variablesConverterMap: variablesConverterMap,
  convertVariables: convertVariables,
  wrapResponseConverter: wrapResponseConverter,
  wrapResponseConverterMap: wrapResponseConverterMap,
  convertWrapResponse: convertWrapResponse,
  responseConverter: responseConverter,
  responseConverterMap: responseConverterMap,
  convertResponse: convertResponse,
  convertWrapRawResponse: convertWrapResponse,
  convertRawResponse: convertResponse
};

var Utils = {};

var node = ((function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "connections"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "Event",
  "kind": "LinkedField",
  "name": "event",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "listed",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateLocationEventMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MutationResult2",
        "kind": "LinkedField",
        "name": "createEvent",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateLocationEventMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MutationResult2",
        "kind": "LinkedField",
        "name": "createEvent",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "event",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "EventEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4e5f67efb461eb3bd11b3ea71168238f",
    "id": null,
    "metadata": {},
    "name": "CreateLocationEventMutation",
    "operationKind": "mutation",
    "text": "mutation CreateLocationEventMutation(\n  $input: CreateEventInput!\n) {\n  createEvent(input: $input) {\n    event {\n      __typename\n      id\n      title\n      startDate\n      endDate\n      listed\n    }\n  }\n}\n"
  }
};
})());

export {
  Types ,
  Internal ,
  Utils ,
  node ,
}
/* node Not a pure module */
