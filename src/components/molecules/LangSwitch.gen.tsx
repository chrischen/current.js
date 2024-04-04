/* TypeScript file generated from LangSwitch.res by genType. */

/* eslint-disable */
/* tslint:disable */

import * as LangSwitchJS from './LangSwitch.res.mjs';

import type {Jsx_element as PervasivesU_Jsx_element} from './PervasivesU.gen';

export type LocaleButton_t = { readonly locale: string; readonly display: string };

export type LocaleButton_props<locale,path,active> = {
  readonly locale: locale; 
  readonly path: path; 
  readonly active: active
};

export type props = {};

export const LocaleButton_make: (_1:LocaleButton_props<LocaleButton_t,string,boolean>) => PervasivesU_Jsx_element = LangSwitchJS.LocaleButton.make as any;

export const make: React.ComponentType<{}> = LangSwitchJS.make as any;

export const $$default: React.ComponentType<{}> = LangSwitchJS.default as any;

export default $$default;

export const LocaleButton: { make: (_1:LocaleButton_props<LocaleButton_t,string,boolean>) => PervasivesU_Jsx_element } = LangSwitchJS.LocaleButton as any;
