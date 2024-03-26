/* TypeScript file generated from Localized.res by genType. */

/* eslint-disable */
/* tslint:disable */

import * as LocalizedJS from './Localized.mjs';

export type WaitForMessages_props<children> = { readonly children: children };

export const WaitForMessages_make: React.ComponentType<{ readonly children: () => JSX.Element }> = LocalizedJS.WaitForMessages.make as any;

export const loadMessages: <T1>(lang:(undefined | string), loadMessages:((_1:string) => Array<Promise<T1>>)) => Promise<T1[]> = LocalizedJS.loadMessages as any;

export const WaitForMessages: { make: React.ComponentType<{ readonly children: () => JSX.Element }> } = LocalizedJS.WaitForMessages as any;
