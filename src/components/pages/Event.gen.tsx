/* TypeScript file generated from Event.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as EventBS__Es6Import from './Event';
const EventBS: any = EventBS__Es6Import;

import type {RouterRequest_t as Router_RouterRequest_t} from '../../../src/components/shared/Router.gen';

import type {context as RelayEnv_context} from '../../../src/entry/RelayEnv.gen';

import type {queryRef as EventQuery_graphql_queryRef} from '../../../src/__generated__/EventQuery_graphql.gen';

// tslint:disable-next-line:interface-over-type-literal
export type props = {};

// tslint:disable-next-line:interface-over-type-literal
export type params = {
  readonly after?: string; 
  readonly before?: string; 
  readonly eventId: string; 
  readonly first?: number; 
  readonly lang: (undefined | string)
};

// tslint:disable-next-line:interface-over-type-literal
export type LoaderArgs_t = {
  readonly context?: RelayEnv_context; 
  readonly params: params; 
  readonly request: Router_RouterRequest_t
};

export const make: React.ComponentType<{}> = EventBS.make;

export const $$default: React.ComponentType<{}> = EventBS.default;

export default $$default;

export const Component: React.ComponentType<{}> = EventBS.Component;

export const loader: (param:LoaderArgs_t) => (null | { readonly data?: EventQuery_graphql_queryRef; readonly messages: Promise<void[]> }) = EventBS.loader;
