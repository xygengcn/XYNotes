import { appWindow } from '@tauri-apps/api/window';

const is = {
  // 是不是客户端
  app(): boolean {
    return !!window.__TAURI__;
  },
  // 是不是主窗口
  mainWindow(): boolean {
    return appWindow.label === 'main';
  },
  // 判断是不是开发环境
  isDevelopment(): boolean {
    // @ts-ignore
    return process.env.NODE_ENV === 'development';
  },
  // 判断是不是生产环境
  isProduction(): boolean {
    // @ts-ignore
    return process.env.NODE_ENV === 'production';
  }
};

export default is;
