/**
 * @generated SignedSource<<69c1aa778987290c5c09e324b0ec6c74>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ServerTime2Fragment$data = {
  readonly currentTime2: number | null;
  readonly " $fragmentType": "ServerTime2Fragment";
};
export type ServerTime2Fragment$key = {
  readonly " $data"?: ServerTime2Fragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServerTime2Fragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServerTime2Fragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currentTime2",
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "85fd84bc07ea7d037faaa61210ac292d";

export default node;
