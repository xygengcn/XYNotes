import type { IGlobalConfig } from './typings/config';

declare global {
  interface Window {
    /**
     * 全局变量
     */
    $config: IGlobalConfig;
  }
}

export { };

