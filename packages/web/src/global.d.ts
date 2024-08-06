
import type { IAppWindow } from './services/app-window';
import type { IGlobalConfig } from './typings/config';

declare global {
  interface Window {
    /**
     * 全局变量
     */
    GlobalConfig: IGlobalConfig;

    /**
     * 客户端数据
     */
    $appWindow: IAppWindow

    /**
     * tauri变量
     */
    __TAURI_INTERNALS__:any
  }
}

export {};
