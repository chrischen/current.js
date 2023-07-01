/**
 * @generated SignedSource<<7949d06257eb61ec5a6fa4fa28c205d4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ServerTime2Query$variables = {};
export type ServerTime2Query$data = {
  readonly currentTime2: number | null;
};
export type ServerTime2Query = {
  response: ServerTime2Query$data;
  variables: ServerTime2Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "currentTime2",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ServerTime2Query",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ServerTime2Query",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "79416ae0fc5aca8939244d5b43064859",
    "id": null,
    "metadata": {},
    "name": "ServerTime2Query",
    "operationKind": "query",
    "text": "query ServerTime2Query {\n  currentTime2\n}\n"
  }
};
})();

(node as any).hash = "8b42f8161d921c4516b2c0ff3ca13200";

export default node;
