/* TypeScript file generated from CreateEvent.res by genType. */

/* eslint-disable */
/* tslint:disable */

import * as CreateEventJS from './CreateEvent.mjs';

import type {Jsx_element as PervasivesU_Jsx_element} from './PervasivesU.gen';

import type {RouterRequest_t as Router_RouterRequest_t} from '../../../src/components/shared/Router.gen';

import type {Types_variables as EventQuery_graphql_Types_variables} from '../../../src/__generated__/EventQuery_graphql.gen';

import type {context as RelayEnv_context} from '../../../src/entry/RelayEnv.gen';

import type {queryRef as EventQuery_graphql_queryRef} from '../../../src/__generated__/EventQuery_graphql.gen';

export type props = {};

export type LoaderArgs_t = {
  readonly context?: RelayEnv_context; 
  readonly params: EventQuery_graphql_Types_variables; 
  readonly request: Router_RouterRequest_t
};

export const make: (_1:props) => PervasivesU_Jsx_element = CreateEventJS.make as any;

export const $$default: (_1:props) => PervasivesU_Jsx_element = CreateEventJS.default as any;

export default $$default;

export const Component: (_1:props) => PervasivesU_Jsx_element = CreateEventJS.Component as any;

export const loader: (param:LoaderArgs_t) => (undefined | EventQuery_graphql_queryRef) = CreateEventJS.loader as any;
