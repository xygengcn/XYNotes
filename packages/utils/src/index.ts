export { default as is } from './is';
export { default as ArrayMap } from './array-map';
export * from './clipboard';
export * from './file';
export * from './scroller';
export * from './object';
export * from './string';
export * from './dom';
export * from './cookie';
export * from './image';
export * from './debounce-throttle'

declare global {
  interface Window {
    /**
     * tauri变量
     */
    __TAURI_INTERNALS__: any;
  }
}
