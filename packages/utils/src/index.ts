import is from './is';
import ArrayMap from './array-map';
import { copyText } from './clipboard';
import { useScroller } from './scroller';
import { omit, pick } from './object';
export { copyText, useScroller, ArrayMap,is,pick,omit };

declare global {
    interface Window {
      /**
       * tauri变量
       */
      __TAURI_INTERNALS__: any;
    }
  }
  