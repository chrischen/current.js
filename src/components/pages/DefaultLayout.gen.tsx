/* TypeScript file generated from DefaultLayout.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as DefaultLayoutBS__Es6Import from './DefaultLayout';
const DefaultLayoutBS: any = DefaultLayoutBS__Es6Import;

import type {RouterRequest_t as Router_RouterRequest_t} from '../../../src/components/shared/Router.gen';

import type {Types_variables as DefaultLayoutQuery_graphql_Types_variables} from '../../../src/__generated__/DefaultLayoutQuery_graphql.gen';

import type {context as RelayEnv_context} from '../../../src/entry/RelayEnv.gen';

import type {queryRef as DefaultLayoutQuery_graphql_queryRef} from '../../../src/__generated__/DefaultLayoutQuery_graphql.gen';

// tslint:disable-next-line:interface-over-type-literal
export type props = {};

// tslint:disable-next-line:interface-over-type-literal
export type LoaderArgs_t = {
  readonly context?: RelayEnv_context; 
  readonly params: DefaultLayoutQuery_graphql_Types_variables; 
  readonly request: Router_RouterRequest_t
};

export const make: React.ComponentType<{}> = DefaultLayoutBS.make;

export const $$default: React.ComponentType<{}> = DefaultLayoutBS.default;

export default $$default;

export const Component: React.ComponentType<{}> = DefaultLayoutBS.Component;

export const loader: (param:LoaderArgs_t) => (undefined | DefaultLayoutQuery_graphql_queryRef) = DefaultLayoutBS.loader;
