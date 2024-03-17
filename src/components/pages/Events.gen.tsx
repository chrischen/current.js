/* TypeScript file generated from Events.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as EventsBS__Es6Import from './Events';
const EventsBS: any = EventsBS__Es6Import;

import type {RouterRequest_t as Router_RouterRequest_t} from '../../../src/components/shared/Router.gen';

import type {context as RelayEnv_context} from '../../../src/entry/RelayEnv.gen';

import type {data as Localized_data} from '../../../src/components/shared/Localized.gen';

import type {queryRef as EventsQuery_graphql_queryRef} from '../../../src/__generated__/EventsQuery_graphql.gen';

// tslint:disable-next-line:interface-over-type-literal
export type props = {};

// tslint:disable-next-line:interface-over-type-literal
export type params = {
  readonly after?: string; 
  readonly before?: string; 
  readonly first?: number; 
  readonly lang: (undefined | string)
};

// tslint:disable-next-line:interface-over-type-literal
export type LoaderArgs_t = {
  readonly context?: RelayEnv_context; 
  readonly params: params; 
  readonly request: Router_RouterRequest_t
};

export const make: React.ComponentType<{}> = EventsBS.make;

export const $$default: React.ComponentType<{}> = EventsBS.default;

export default $$default;

export const Component: React.ComponentType<{}> = EventsBS.Component;

export const loader: (param:LoaderArgs_t) => (null | Localized_data<(undefined | EventsQuery_graphql_queryRef)>) = EventsBS.loader;
