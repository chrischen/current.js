/* TypeScript file generated from ViewerRsvpStatus.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as ViewerRsvpStatusBS__Es6Import from './ViewerRsvpStatus';
const ViewerRsvpStatusBS: any = ViewerRsvpStatusBS__Es6Import;

import type {Mouse_t as JsxEventU_Mouse_t} from './JsxEventU.gen';

// tslint:disable-next-line:interface-over-type-literal
export type props<onJoin,onLeave,joined> = {
  readonly onJoin: onJoin; 
  readonly onLeave: onLeave; 
  readonly joined: joined
};

export const make: React.ComponentType<{
  readonly onJoin: (_1:JsxEventU_Mouse_t) => void; 
  readonly onLeave: (_1:JsxEventU_Mouse_t) => void; 
  readonly joined: boolean
}> = ViewerRsvpStatusBS.make;

export const $$default: React.ComponentType<{
  readonly onJoin: (_1:JsxEventU_Mouse_t) => void; 
  readonly onLeave: (_1:JsxEventU_Mouse_t) => void; 
  readonly joined: boolean
}> = ViewerRsvpStatusBS.default;

export default $$default;
