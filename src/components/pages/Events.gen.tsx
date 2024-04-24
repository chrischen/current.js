/* TypeScript file generated from Events.res by genType. */

/* eslint-disable */
/* tslint:disable */

import * as EventsJS from './Events.re.mjs';

import type {Datetime_t as Util_Datetime_t} from '../../../src/components/shared/Util.gen';

import type {Jsx_element as PervasivesU_Jsx_element} from './PervasivesU.gen';

import type {RouterRequest_t as Router_RouterRequest_t} from '../../../src/components/shared/Router.gen';

import type {context as RelayEnv_context} from '../../../src/entry/RelayEnv.gen';

import type {data as WaitForMessages_data} from '../../../src/components/shared/i18n/WaitForMessages.gen';

import type {queryRef as EventsQuery_graphql_queryRef} from '../../../src/__generated__/EventsQuery_graphql.gen';

export type props = {};

export type params = {
  readonly after?: string; 
  readonly afterDate?: Util_Datetime_t; 
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

export const loader: (param:LoaderArgs_t) => Promise<WaitForMessages_data<(undefined | EventsQuery_graphql_queryRef)>> = EventsJS.loader as any;

export const HydrateFallbackElement: PervasivesU_Jsx_element = EventsJS.HydrateFallbackElement as any;
