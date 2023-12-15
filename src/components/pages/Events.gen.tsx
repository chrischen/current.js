/* TypeScript file generated from Events.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as EventsBS__Es6Import from './Events';
const EventsBS: any = EventsBS__Es6Import;

import type {Jsx_element as PervasivesU_Jsx_element} from './PervasivesU.gen';

import type {Types_variables as EventsQuery_graphql_Types_variables} from '../../../src/__generated__/EventsQuery_graphql.gen';

import type {context as RelayEnv_context} from '../../../src/entry/RelayEnv.gen';

import type {queryRef as EventsQuery_graphql_queryRef} from '../../../src/__generated__/EventsQuery_graphql.gen';

// tslint:disable-next-line:interface-over-type-literal
export type props = {};

// tslint:disable-next-line:interface-over-type-literal
export type RouterRequest_t = { readonly url: string };

// tslint:disable-next-line:interface-over-type-literal
export type LoaderArgs_t = {
  readonly context?: RelayEnv_context; 
  readonly params: EventsQuery_graphql_Types_variables; 
  readonly request: RouterRequest_t
};

export const make: (_1:props) => PervasivesU_Jsx_element = EventsBS.make;

export const $$default: (_1:props) => PervasivesU_Jsx_element = EventsBS.default;

export default $$default;

export const Component: (_1:props) => PervasivesU_Jsx_element = EventsBS.Component;

export const loader: (param:LoaderArgs_t) => (undefined | EventsQuery_graphql_queryRef) = EventsBS.loader;
