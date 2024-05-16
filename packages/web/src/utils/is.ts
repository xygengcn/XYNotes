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
  development(): boolean {
    // @ts-ignore
    return process.env.NODE_ENV === 'development';
  },
  // 判断是不是生产环境
  production(): boolean {
    // @ts-ignore
    return process.env.NODE_ENV === 'production';
  },
  // 判断是不是url
  url(url: string) {
    if ((typeof url === 'string' && url.indexOf('http://') === 0) || url.indexOf('https://') === 0) {
      try {
        const uri = new URL(url);
        return !!uri;
      } catch (error) {}
    }
    return false;
  }
};

export default is;
