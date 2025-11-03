/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare const __VITE_APP_AXIOS_BASEURL__: string;
declare const __VITE_APP_RESOURCES_BASEURL__: string;
declare const __VITE_APP_ENV__: 'development' | 'production' | 'sit';
