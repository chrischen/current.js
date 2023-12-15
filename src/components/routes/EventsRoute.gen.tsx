/* TypeScript file generated from EventsRoute.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as EventsRouteBS__Es6Import from './EventsRoute';
const EventsRouteBS: any = EventsRouteBS__Es6Import;

import type {Jsx_element as PervasivesU_Jsx_element} from './PervasivesU.gen';

import type {Types_variables as EventsQuery_graphql_Types_variables} from '../../../src/__generated__/EventsQuery_graphql.gen';

import type {context as RelayEnv_context} from '../../../src/entry/RelayEnv.gen';

import type {props as Events_props} from '../../../src/components/pages/Events.gen';

import type {queryRef as EventsQuery_graphql_queryRef} from '../../../src/__generated__/EventsQuery_graphql.gen';

// tslint:disable-next-line:interface-over-type-literal
export type LoaderArgs_t = { readonly context?: RelayEnv_context; readonly params: EventsQuery_graphql_Types_variables };

export const Component: (_1:Events_props) => PervasivesU_Jsx_element = EventsRouteBS.Component;

export const loader: (param:LoaderArgs_t) => (undefined | EventsQuery_graphql_queryRef) = EventsRouteBS.loader;
