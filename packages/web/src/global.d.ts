import type { window } from '@tauri-apps/api';
import type { IGlobalConfig } from './typings/config';

declare global {
  interface Window {
    /**
     * 客户端才有的功能
     */
    app: {
      openDevtools: (flag: boolean) => void;
      getAppWindow: (options: { nid: string }) => window.WebviewWindow;
      createWindow: (options: { nid: string }) => void;
      show: () => void;
    };
    /**
     * 全局变量
     */
    GlobalConfig: IGlobalConfig;

    /**
     * tauri变量
     */
    __TAURI_INTERNALS__:any
  }
}

export {};
