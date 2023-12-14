/* TypeScript file generated from EventsList.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as EventsListBS__Es6Import from './EventsList';
const EventsListBS: any = EventsListBS__Es6Import;

import type {fragmentRefs as RescriptRelay_fragmentRefs} from 'rescript-relay/src/RescriptRelay.gen';

// tslint:disable-next-line:interface-over-type-literal
export type props<events> = { readonly events: events };

export const make: React.ComponentType<{ readonly events: RescriptRelay_fragmentRefs<"EventsListFragment"> }> = EventsListBS.make;

export const $$default: React.ComponentType<{ readonly events: RescriptRelay_fragmentRefs<"EventsListFragment"> }> = EventsListBS.default;

export default $$default;
