/**
 * @generated SignedSource<<557fbefa2d0088195dcf5426431b2420>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UsersListStoryQuery$variables = {};
export type UsersListStoryQuery$data = {
  readonly user: {
    readonly " $fragmentSpreads": FragmentRefs<"UsersList_user">;
  } | null;
};
export type UsersListStoryQuery = {
  response: UsersListStoryQuery$data;
  variables: UsersListStoryQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UsersListStoryQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UsersList_user"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UsersListStoryQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "username",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "rating",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0e3e30b829eff4a4853455e8a3191f5b",
    "id": null,
    "metadata": {},
    "name": "UsersListStoryQuery",
    "operationKind": "query",
    "text": "query UsersListStoryQuery {\n  user {\n    ...UsersList_user\n  }\n}\n\nfragment UsersList_user on User {\n  username\n  rating\n}\n"
  }
};

(node as any).hash = "2d65c46641905e08968c89fc0fef92c3";

export default node;
