/* TypeScript file generated from Events.res by genType. */

/* eslint-disable */
/* tslint:disable */

import * as EventsJS from './Events.mjs';

import type {RouterRequest_t as Router_RouterRequest_t} from '../../../src/components/shared/Router.gen';

import type {context as RelayEnv_context} from '../../../src/entry/RelayEnv.gen';

import type {data as Localized_data} from '../../../src/components/shared/Localized.gen';

import type {queryRef as EventsQuery_graphql_queryRef} from '../../../src/__generated__/EventsQuery_graphql.gen';

export type props = {};

export type params = {
  readonly after?: string; 
  readonly before?: string; 
  readonly first?: number; 
  readonly lang: (undefined | string)
};

export type LoaderArgs_t = {
  readonly context?: RelayEnv_context; 
  readonly params: params; 
  readonly request: Router_RouterRequest_t
};

export const make: React.ComponentType<{}> = EventsJS.make as any;

export const $$default: React.ComponentType<{}> = EventsJS.default as any;

export default $$default;

export const Component: React.ComponentType<{}> = EventsJS.Component as any;

export const loader: (param:LoaderArgs_t) => (null | Localized_data<(undefined | EventsQuery_graphql_queryRef)>) = EventsJS.loader as any;
