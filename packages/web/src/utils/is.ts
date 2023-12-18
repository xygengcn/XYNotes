import { appWindow } from '@tauri-apps/api/window';

const is = {
  // 是不是客户端
  app(): boolean {
    return !!window.__TAURI__;
  },
  mainWindow(): boolean {
    return appWindow.label === 'main';
  }
};

export default is;
