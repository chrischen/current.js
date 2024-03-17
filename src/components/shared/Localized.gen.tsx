/* TypeScript file generated from Localized.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as LocalizedBS__Es6Import from './Localized';
const LocalizedBS: any = LocalizedBS__Es6Import;

// tslint:disable-next-line:interface-over-type-literal
export type props<children> = { readonly children: children };

export const make: React.ComponentType<{ readonly children: React.ReactNode }> = LocalizedBS.make;

export const loadMessages: <T1>(lang:(undefined | string), loadMessages:((_1:string) => Array<Promise<T1>>)) => Promise<T1[]> = LocalizedBS.loadMessages;
