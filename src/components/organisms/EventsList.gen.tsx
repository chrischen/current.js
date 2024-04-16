/* TypeScript file generated from EventsList.res by genType. */

/* eslint-disable */
/* tslint:disable */

import * as EventsListJS from './EventsList.re.mjs';

import type {fragmentRefs as RescriptRelay_fragmentRefs} from 'rescript-relay/src/RescriptRelay.gen';

export type props<events> = { readonly events: events };

export const make: React.ComponentType<{ readonly events: RescriptRelay_fragmentRefs<"EventsListFragment"> }> = EventsListJS.make as any;

export const $$default: React.ComponentType<{ readonly events: RescriptRelay_fragmentRefs<"EventsListFragment"> }> = EventsListJS.default as any;

export default $$default;
