import type { IGlobalConfig } from './typings/config';

declare global {
  interface Window {
    openDevtools: (flag: boolean) => void;
    createWindow: (options: { nid: string }) => void;
    show: () => void;
    /**
     * 全局变量
     */
    GlobalConfig: IGlobalConfig;
  }
}

export {};
