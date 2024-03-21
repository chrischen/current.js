/* TypeScript file generated from Grid.res by genType. */

/* eslint-disable */
/* tslint:disable */

import * as GridJS from './Grid.mjs';

import type {Jsx_element as PervasivesU_Jsx_element} from './PervasivesU.gen';

export type props<cols,rows,className,children> = {
  readonly cols?: cols; 
  readonly rows?: rows; 
  readonly className?: className; 
  readonly children: children
};

export const make: (_1:props<number,number,string,JSX.Element>) => PervasivesU_Jsx_element = GridJS.make as any;
