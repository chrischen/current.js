/* TypeScript file generated from Nav.res by genType. */

/* eslint-disable */
/* tslint:disable */

import * as NavJS from './Nav.re.mjs';

import type {fragmentRefs as RescriptRelay_fragmentRefs} from 'rescript-relay/src/RescriptRelay.gen';

export type Viewer_props<viewer> = { readonly viewer: viewer };

export type props<query> = { readonly query: query };

export const Viewer_make: React.ComponentType<{ readonly viewer: RescriptRelay_fragmentRefs<"Nav_viewer"> }> = NavJS.Viewer.make as any;

export const make: React.ComponentType<{ readonly query: RescriptRelay_fragmentRefs<"Nav_query"> }> = NavJS.make as any;

export const $$default: React.ComponentType<{ readonly query: RescriptRelay_fragmentRefs<"Nav_query"> }> = NavJS.default as any;

export default $$default;

export const Viewer: { make: React.ComponentType<{ readonly viewer: RescriptRelay_fragmentRefs<"Nav_viewer"> }> } = NavJS.Viewer as any;
