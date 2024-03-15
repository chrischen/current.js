/* TypeScript file generated from Lang.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as LangBS__Es6Import from './Lang';
const LangBS: any = LangBS__Es6Import;

import type {RouterRequest_t as Router_RouterRequest_t} from '../../../src/components/shared/Router.gen';

import type {context as RelayEnv_context} from '../../../src/entry/RelayEnv.gen';

// tslint:disable-next-line:interface-over-type-literal
export type RouteParams_t = { readonly lang: (undefined | string); readonly locale: (undefined | string) };

// tslint:disable-next-line:interface-over-type-literal
export type props = {};

// tslint:disable-next-line:interface-over-type-literal
export type LoaderArgs_t = {
  readonly context?: RelayEnv_context; 
  readonly params: RouteParams_t; 
  readonly request: Router_RouterRequest_t
};

export const make: React.ComponentType<{}> = LangBS.make;

export const $$default: React.ComponentType<{}> = LangBS.default;

export default $$default;

export const Component: React.ComponentType<{}> = LangBS.Component;

export const loader: <T1>(param:LoaderArgs_t) => (null | T1) = LangBS.loader;
