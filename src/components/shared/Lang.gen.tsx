/* TypeScript file generated from Lang.res by genType. */

/* eslint-disable */
/* tslint:disable */

import * as LangJS from './Lang.re.mjs';

import type {RouterRequest_t as Router_RouterRequest_t} from './Router.gen';

import type {context as RelayEnv_context} from '../../../src/entry/RelayEnv.gen';

import type {props as LangProvider_props} from './LangProvider.gen';

export type RouteParams_t = { readonly lang: (undefined | string); readonly locale: (undefined | string) };

export type locale = { readonly locale: string; readonly lang: string };

export type LoaderArgs_t = {
  readonly context?: RelayEnv_context; 
  readonly params: RouteParams_t; 
  readonly request: Router_RouterRequest_t
};

export const loader: (param:LoaderArgs_t) => Promise<locale> = LangJS.loader as any;

export const Component: React.ComponentType<{}> = LangJS.Component as any;
