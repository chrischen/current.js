/* TypeScript file generated from UserProvider.res by genType. */

/* eslint-disable */
/* tslint:disable */

import * as UserProviderJS from './UserProvider.res.mjs';

import type {fragmentRefs as RescriptRelay_fragmentRefs} from 'rescript-relay/src/RescriptRelay.gen';

export type props<children,query> = { readonly children: children; readonly query: query };

export const make: React.ComponentType<{ readonly children: React.ReactNode; readonly query: RescriptRelay_fragmentRefs<"UserProvider_user"> }> = UserProviderJS.make as any;
