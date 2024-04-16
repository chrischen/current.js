/* TypeScript file generated from Ui.res by genType. */

/* eslint-disable */
/* tslint:disable */

import * as UiJS from './Ui.re.mjs';

import type {Jsx_element as PervasivesU_Jsx_element} from './PervasivesU.gen';

export type ImgixParams_t = {
  auto: (undefined | string); 
  fit: (undefined | string); 
  crop: (undefined | string); 
  "fp-z": (undefined | string); 
  "fp-y": (undefined | string); 
  "fp-x": (undefined | string); 
  ar: (undefined | string)
};

export type Image_t = {
  readonly src: string; 
  readonly alt: string; 
  readonly imgixParams: (undefined | ImgixParams_t)
};

export type Breakpoints_t<a,b> = {
  readonly default: b; 
  readonly sm: (undefined | a); 
  readonly md: (undefined | a); 
  readonly lg: (undefined | a); 
  readonly xl: (undefined | a); 
  readonly xxl: (undefined | a)
};

export type Picture_source<attr> = {
  readonly htmlAttributes: (undefined | {
  }); 
  readonly imgixParams: (undefined | ImgixParams_t); 
  readonly width: (undefined | number); 
  readonly height: (undefined | number); 
  readonly sizes: (undefined | string)
};

export type Picture_defaultSource = {
  readonly width: (undefined | number); 
  readonly height: (undefined | number); 
  readonly sizes: (undefined | string); 
  readonly imgixParams: (undefined | ImgixParams_t)
};

export type Picture_sources<attr> = { readonly sources: Picture_source<{}>[]; readonly default: Picture_defaultSource };

export type Picture_props<src,className,sources,breakpoints,imgixParams,alt,lazyLoad> = {
  readonly src: src; 
  readonly className?: className; 
  readonly sources?: sources; 
  readonly breakpoints?: breakpoints; 
  readonly imgixParams?: imgixParams; 
  readonly alt?: alt; 
  readonly lazyLoad?: lazyLoad
};

export type Img_props<src,className,alt,width,height,lazyLoad> = {
  readonly src: src; 
  readonly className?: className; 
  readonly alt?: alt; 
  readonly width?: width; 
  readonly height?: height; 
  readonly lazyLoad?: lazyLoad
};

export type DImg_props<src,alt,className,imgixParams,domain,sizes,breakpoints,width,height,lazyLoad> = {
  readonly src: src; 
  readonly alt?: alt; 
  readonly className?: className; 
  readonly imgixParams?: imgixParams; 
  readonly domain?: domain; 
  readonly sizes?: sizes; 
  readonly breakpoints?: breakpoints; 
  readonly width?: width; 
  readonly height?: height; 
  readonly lazyLoad?: lazyLoad
};

export type ExclamationIcon_props<ariaHidden> = { readonly ariaHidden: ariaHidden };

export type Alert_props<title,message> = { readonly title: title; readonly message: message };

export type PageHeading_props<title,action,description> = {
  readonly title: title; 
  readonly action: action; 
  readonly description: description
};

export type Press_props = {};

export type Hero_props<title,title2,description,action1,action2,image> = {
  readonly title: title; 
  readonly title2: title2; 
  readonly description: description; 
  readonly action1: action1; 
  readonly action2: action2; 
  readonly image: image
};

export type Hero2_props<title,title2,description,action1,action2,image> = {
  readonly title: title; 
  readonly title2: title2; 
  readonly description: description; 
  readonly action1: action1; 
  readonly action2: action2; 
  readonly image: image
};

export type HeroSlider_props<title,subtitle,title2,description,action1,image1,image2> = {
  readonly title: title; 
  readonly subtitle?: subtitle; 
  readonly title2: title2; 
  readonly description: description; 
  readonly action1: action1; 
  readonly image1: image1; 
  readonly image2: image2
};

export type HalfBg_props<children,callToAction> = { readonly children: children; readonly callToAction?: callToAction };

export type Domain_CarouselCard_t = {
  readonly title: string; 
  readonly subtitle: string; 
  readonly src: string; 
  readonly imageAlt: string; 
  readonly link: string
};

export type CardCarousel_props<cards,title,moreText,moreLink> = {
  readonly cards: cards; 
  readonly title: title; 
  readonly moreText: moreText; 
  readonly moreLink: moreLink
};

export const stringToElement: (str:string) => JSX.Element = UiJS.stringToElement as any;

export const Picture_make: React.ComponentType<{
  readonly src: string; 
  readonly className?: string; 
  readonly sources?: Picture_sources<{
    readonly media: string
  }>; 
  readonly breakpoints?: Breakpoints_t<Picture_source<{
  }>,Picture_defaultSource>; 
  readonly imgixParams?: ImgixParams_t; 
  readonly alt?: string; 
  readonly lazyLoad?: boolean
}> = UiJS.Picture.make as any;

export const Img_make: React.ComponentType<{
  readonly src: any; 
  readonly className?: string; 
  readonly alt?: string; 
  readonly width?: string; 
  readonly height?: string; 
  readonly lazyLoad?: boolean
}> = UiJS.Img.make as any;

export const DImg_make: React.ComponentType<{
  readonly src: string; 
  readonly alt?: string; 
  readonly className?: string; 
  readonly imgixParams?: ImgixParams_t; 
  readonly domain?: string; 
  readonly sizes?: string; 
  readonly breakpoints?: Breakpoints_t<string,string>; 
  readonly width?: number; 
  readonly height?: number; 
  readonly lazyLoad?: boolean
}> = UiJS.DImg.make as any;

export const ExclamationIcon_make: React.ComponentType<{ readonly ariaHidden: string }> = UiJS.ExclamationIcon.make as any;

export const Alert_make: (_1:Alert_props<string,string>) => PervasivesU_Jsx_element = UiJS.Alert.make as any;

export const PageHeading_make: (_1:PageHeading_props<string,JSX.Element,JSX.Element>) => PervasivesU_Jsx_element = UiJS.PageHeading.make as any;

export const Press_make: React.ComponentType<{}> = UiJS.Press.make as any;

export const Hero_make: React.ComponentType<{
  readonly title: string; 
  readonly title2: string; 
  readonly description: JSX.Element; 
  readonly action1: JSX.Element; 
  readonly action2: JSX.Element; 
  readonly image: JSX.Element
}> = UiJS.Hero.make as any;

export const Hero2_make: (_1:Hero2_props<string,string,JSX.Element,JSX.Element,JSX.Element,JSX.Element>) => PervasivesU_Jsx_element = UiJS.Hero2.make as any;

export const HeroSlider_make: (_1:HeroSlider_props<string,string,string,JSX.Element,JSX.Element,Image_t,Image_t>) => PervasivesU_Jsx_element = UiJS.HeroSlider.make as any;

export const HalfBg_make: (_1:HalfBg_props<JSX.Element,JSX.Element>) => PervasivesU_Jsx_element = UiJS.HalfBg.make as any;

export const CardCarousel_make: (_1:CardCarousel_props<Domain_CarouselCard_t[],string,string,string>) => PervasivesU_Jsx_element = UiJS.CardCarousel.make as any;

export const Hero: { make: React.ComponentType<{
  readonly title: string; 
  readonly title2: string; 
  readonly description: JSX.Element; 
  readonly action1: JSX.Element; 
  readonly action2: JSX.Element; 
  readonly image: JSX.Element
}> } = UiJS.Hero as any;

export const HalfBg: { make: (_1:HalfBg_props<JSX.Element,JSX.Element>) => PervasivesU_Jsx_element } = UiJS.HalfBg as any;

export const Img: { make: React.ComponentType<{
  readonly src: any; 
  readonly className?: string; 
  readonly alt?: string; 
  readonly width?: string; 
  readonly height?: string; 
  readonly lazyLoad?: boolean
}> } = UiJS.Img as any;

export const PageHeading: { make: (_1:PageHeading_props<string,JSX.Element,JSX.Element>) => PervasivesU_Jsx_element } = UiJS.PageHeading as any;

export const Press: { make: React.ComponentType<{}> } = UiJS.Press as any;

export const Hero2: { make: (_1:Hero2_props<string,string,JSX.Element,JSX.Element,JSX.Element,JSX.Element>) => PervasivesU_Jsx_element } = UiJS.Hero2 as any;

export const CardCarousel: { make: (_1:CardCarousel_props<Domain_CarouselCard_t[],string,string,string>) => PervasivesU_Jsx_element } = UiJS.CardCarousel as any;

export const Alert: { make: (_1:Alert_props<string,string>) => PervasivesU_Jsx_element } = UiJS.Alert as any;

export const Picture: { make: React.ComponentType<{
  readonly src: string; 
  readonly className?: string; 
  readonly sources?: Picture_sources<{
    readonly media: string
  }>; 
  readonly breakpoints?: Breakpoints_t<Picture_source<{
  }>,Picture_defaultSource>; 
  readonly imgixParams?: ImgixParams_t; 
  readonly alt?: string; 
  readonly lazyLoad?: boolean
}> } = UiJS.Picture as any;

export const ExclamationIcon: { make: React.ComponentType<{ readonly ariaHidden: string }> } = UiJS.ExclamationIcon as any;

export const HeroSlider: { make: (_1:HeroSlider_props<string,string,string,JSX.Element,JSX.Element,Image_t,Image_t>) => PervasivesU_Jsx_element } = UiJS.HeroSlider as any;

export const DImg: { make: React.ComponentType<{
  readonly src: string; 
  readonly alt?: string; 
  readonly className?: string; 
  readonly imgixParams?: ImgixParams_t; 
  readonly domain?: string; 
  readonly sizes?: string; 
  readonly breakpoints?: Breakpoints_t<string,string>; 
  readonly width?: number; 
  readonly height?: number; 
  readonly lazyLoad?: boolean
}> } = UiJS.DImg as any;
