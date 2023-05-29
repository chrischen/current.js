/**
 * @generated SignedSource<<639914c4802dba5ece65ccc71aac32e9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ServerTimeQuery$variables = {};
export type ServerTimeQuery$data = {
  readonly currentTime: number | null;
};
export type ServerTimeQuery = {
  response: ServerTimeQuery$data;
  variables: ServerTimeQuery$variables;
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
    "name": "ServerTimeQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ServerTimeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "af07a5f3676520df31e8a14376660d0e",
    "id": null,
    "metadata": {},
    "name": "ServerTimeQuery",
    "operationKind": "query",
    "text": "query ServerTimeQuery {\n  currentTime\n}\n"
  }
};
})();

(node as any).hash = "76507d352506cd2b51de5197fee3e349";

export default node;
