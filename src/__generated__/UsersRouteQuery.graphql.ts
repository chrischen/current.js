/**
 * @generated SignedSource<<4d2676ef8b7380eb1a04a4e350529678>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UsersRouteQuery$variables = {};
export type UsersRouteQuery$data = {
  readonly currentTime: number | null;
};
export type UsersRouteQuery = {
  response: UsersRouteQuery$data;
  variables: UsersRouteQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "currentTime",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UsersRouteQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UsersRouteQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "392c8ea88489e9020e0e99426f4117ec",
    "id": null,
    "metadata": {},
    "name": "UsersRouteQuery",
    "operationKind": "query",
    "text": "query UsersRouteQuery {\n  currentTime\n}\n"
  }
};
})();

(node as any).hash = "6570abef9ad0b61b9a59fd9b7ab9be68";

export default node;
