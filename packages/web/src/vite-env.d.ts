/// <reference types="vite/client" />

declare const __APP_VERSION__: string;

// env.d.ts
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_AXIOS_BASEURL: string;
  readonly VITE_APP_BLOG_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
