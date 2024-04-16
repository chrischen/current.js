/* TypeScript file generated from ViewerRsvpStatus.res by genType. */

/* eslint-disable */
/* tslint:disable */

import * as ViewerRsvpStatusJS from './ViewerRsvpStatus.re.mjs';

import type {Mouse_t as JsxEventU_Mouse_t} from './JsxEventU.gen';

export type props<onJoin,onLeave,joined> = {
  readonly onJoin: onJoin; 
  readonly onLeave: onLeave; 
  readonly joined: joined
};

export const make: React.ComponentType<{
  readonly onJoin: (_1:JsxEventU_Mouse_t) => void; 
  readonly onLeave: (_1:JsxEventU_Mouse_t) => void; 
  readonly joined: boolean
}> = ViewerRsvpStatusJS.make as any;

export const $$default: React.ComponentType<{
  readonly onJoin: (_1:JsxEventU_Mouse_t) => void; 
  readonly onLeave: (_1:JsxEventU_Mouse_t) => void; 
  readonly joined: boolean
}> = ViewerRsvpStatusJS.default as any;

export default $$default;
