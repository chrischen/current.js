/* TypeScript file generated from Lang.res by genType. */

/* eslint-disable */
/* tslint:disable */

import * as LangJS from './Lang.mjs';

import type {RouterRequest_t as Router_RouterRequest_t} from '../../../src/components/shared/Router.gen';

import type {context as RelayEnv_context} from '../../../src/entry/RelayEnv.gen';

export type RouteParams_t = { readonly lang: (undefined | string); readonly locale: (undefined | string) };

export type props = {};

export type LoaderArgs_t = {
  readonly context?: RelayEnv_context; 
  readonly params: RouteParams_t; 
  readonly request: Router_RouterRequest_t
};

export const make: React.ComponentType<{}> = LangJS.make as any;

export const $$default: React.ComponentType<{}> = LangJS.default as any;

export default $$default;

export const Component: React.ComponentType<{}> = LangJS.Component as any;

export const loader: <T1>(param:LoaderArgs_t) => (null | T1) = LangJS.loader as any;
