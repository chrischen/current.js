/**
 * @generated SignedSource<<4cfb4ec3f5514fc866beaf5977abfde9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AppQuery$variables = {};
export type AppQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ServerTime2Fragment" | "ServerTimeFragment">;
};
export type AppQuery = {
  response: AppQuery$data;
  variables: AppQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppQuery",
    "selections": [
      {
        "kind": "Defer",
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ServerTimeFragment"
          }
        ]
      },
      {
        "kind": "Defer",
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ServerTime2Fragment"
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppQuery",
    "selections": [
      {
        "if": null,
        "kind": "Defer",
        "label": "AppQuery$defer$ServerTimeFragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "currentTime",
            "storageKey": null
          }
        ]
      },
      {
        "if": null,
        "kind": "Defer",
        "label": "AppQuery$defer$ServerTime2Fragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "currentTime2",
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "d404247d2943667f43f7857e4993af83",
    "id": null,
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": "query AppQuery {\n  ...ServerTimeFragment @defer(label: \"AppQuery$defer$ServerTimeFragment\")\n  ...ServerTime2Fragment @defer(label: \"AppQuery$defer$ServerTime2Fragment\")\n}\n\nfragment ServerTime2Fragment on Query {\n  currentTime2\n}\n\nfragment ServerTimeFragment on Query {\n  currentTime\n}\n"
  }
};

(node as any).hash = "a1522f5bdd0247c2c3bb299640a6c3e5";

export default node;
