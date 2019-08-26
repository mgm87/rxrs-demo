import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RxRs } from 'rxrs';

/**
 * Enum to track the key names for the ScreenWidths
 */
export enum FullScreenWidthEnum {
  xSmall = 'xSmall',
  small = 'small',
  medium = 'medium',
  large = 'large',
  xLarge = 'xLarge'
}

/**
 * The screen width options
 * xSmall - < 599
 * small - 600 - 1023
 * medium - 1024 - 1439
 * large - 1440 - 1919
 * xLarge - > 1920
 */
export interface FullScreenWidths {
  [FullScreenWidthEnum.xSmall]: boolean;
  [FullScreenWidthEnum.small]: boolean;
  [FullScreenWidthEnum.medium]: boolean;
  [FullScreenWidthEnum.large]: boolean;
  [FullScreenWidthEnum.xLarge]: boolean;
}

/**
 * The screen size break points
 * Sizes sourced from: https://material.io/design/layout/responsive-layout-grid.html#breakpoints
 */
export const screenSizes = {
  xSmall: 0,
  small: 600,
  medium: 1024,
  large: 1440,
  xLarge: 1920
};

/**
 * The initial (all false) screen sizes
 */
export const initialScreenSizes: FullScreenWidths = {
  xSmall: false,
  small: false,
  medium: false,
  large: false,
  xLarge: false
};

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
 /**
  * Tracks if the screen is a mobile size
  */
 isMobileState: Observable<boolean>;

 /**
  * Tracks if the screen is a mobile size
  */
 isTabletState: Observable<boolean>;

 /**
  * The observable of screen sizes
  */
 sizes: Observable<FullScreenWidths>;

 private screenSizeSubject: BehaviorSubject<FullScreenWidths>;
 private rxrs: RxRs;

 constructor() {
   this.screenSizeSubject = new BehaviorSubject(initialScreenSizes);
   this.sizes = this.screenSizeSubject.asObservable();

   // Determines what sizes constitute a mobile screen
   this.isMobileState = this.screenSizeSubject.pipe(
     map((screenWidths) => {
       return screenWidths.xSmall ? true : false;
     })
   );

   // Determines what sizes constitute a tablet screen
   this.isTabletState = this.screenSizeSubject.pipe(
     map((screenWidths) => {
       return screenWidths.xSmall ? true : false;
     })
   );

   // Configure the breakpoints
   this.rxrs = new RxRs();
   this.rxrs.observe(`(max-width: ${screenSizes.small}px)`).subscribe((matches) => {
     if (matches) {
       this.screenSizeSubject.next({
         ...initialScreenSizes,
         xSmall: matches
       });
     }
   });
   this.rxrs.observe(`(min-width: ${screenSizes.small}px) and (max-width: ${screenSizes.medium - 1}px)`).subscribe((matches) => {
     if (matches) {
       this.screenSizeSubject.next({
         ...initialScreenSizes,
         small: matches
       });
     }
   });
   this.rxrs.observe(`(min-width: ${screenSizes.medium}px) and (max-width: ${screenSizes.large - 1}px)`).subscribe((matches) => {
     if (matches) {
       this.screenSizeSubject.next({
         ...initialScreenSizes,
         medium: matches
       });
     }
   });
   this.rxrs.observe(`(min-width: ${screenSizes.large}px) and (max-width: ${screenSizes.xLarge - 1}px)`).subscribe((matches) => {
     if (matches) {
       this.screenSizeSubject.next({
         ...initialScreenSizes,
         large: matches
       });
     }
   });
   this.rxrs.observe(`(min-width: ${screenSizes.xLarge}px)`).subscribe((matches) => {
     if (matches) {
       this.screenSizeSubject.next({
         ...initialScreenSizes,
         xLarge: matches
       });
     }
   });
 }
}
