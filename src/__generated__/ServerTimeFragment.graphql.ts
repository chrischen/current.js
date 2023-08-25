/**
 * @generated SignedSource<<7eaf331c521de672f5f1c7f3f765516e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ServerTimeFragment$data = {
  readonly currentTime: number | null;
  readonly " $fragmentType": "ServerTimeFragment";
};
export type ServerTimeFragment$key = {
  readonly " $data"?: ServerTimeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServerTimeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServerTimeFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currentTime",
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "d966bcae50d542975470387766339ad1";

export default node;
