/**
 * @generated SignedSource<<5ce86f74129fc8f7994fa3dcd8fdb0fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UsersList_user$data = {
  readonly rating: number | null;
  readonly username: string | null;
  readonly " $fragmentType": "UsersList_user";
};
export type UsersList_user$key = {
  readonly " $data"?: UsersList_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UsersList_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UsersList_user",
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
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "6b6ede21f5d657483b046bb9f98c3445";

export default node;
