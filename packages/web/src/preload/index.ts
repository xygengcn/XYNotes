/**
 * 客户端注册
 */

import { invoke } from '@tauri-apps/api';

if (window.__TAURI__) {
  // 打开控制台
  window.openDevtools = (flag: boolean = true) => {
    invoke('open_devtools', { flag });
  };
}
