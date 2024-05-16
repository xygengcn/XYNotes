/**
 * 客户端注册
 */

import Confirm from '@/components/common/confirm';
import Toast from '@/components/common/toast';
import middlewareHook from '@/middlewares';
import { configSaveDefautlMiddleware } from '@/middlewares/config.middleware';
import { deleteNoteDefaultMiddleware, saveNoteDefaultMiddleware } from '@/middlewares/note.middleware';
import perloadDefaultMiddleware from '@/middlewares/preload.middleware';
import is from '@/utils/is';
import { invoke } from '@tauri-apps/api';
import { window as AppWindow } from '@tauri-apps/api';

/**
 * 注册客户端事件
 */
if (is.app()) {
  // 打开控制台
  const openDevtools = (flag: boolean) => {
    invoke('open_devtools', { label: AppWindow.appWindow.label, flag });
  };

  /**
   * 获取窗口
   * @param options
   * @returns
   */
  const getAppWindow = (options: { nid: string }) => {
    const webviewId = `nid-${options.nid}`;
    // 获取窗口
    let webview = AppWindow.WebviewWindow.getByLabel(webviewId);
    if (webview) {
      return webview;
    }
    return undefined;
  };

  // 创建窗口
  const createWindow = (options: { nid: string }) => {
    console.log('[createWindow]', options);
    const webviewId = `nid-${options.nid}`;

    // 获取窗口
    let webview = AppWindow.WebviewWindow.getByLabel(webviewId);
    if (webview) {
      webview.setFocus();
      return;
    }

    webview = new AppWindow.WebviewWindow(webviewId, {
      url: `/detail?nid=${options.nid}`,
      fullscreen: false,
      alwaysOnTop: false,
      resizable: true,
      decorations: false,
      transparent: true
    });
    webview.once('tauri://created', function () {
      console.log('[createWindow] created');
    });
    webview.once('tauri://error', function (e) {
      console.error('[createWindow] error', e);
    });
    return webview;
  };

  // 显示窗口
  const show = () => {
    AppWindow.appWindow.show();
  };

  // 客户端功能
  window.app = {
    show,
    getAppWindow,
    createWindow,
    openDevtools
  };
}

/**
 * ui赋值
 */
window.$ui = {
  toast: Toast,
  confirm: Confirm
};

/**
 * 注册中间件
 */
middlewareHook.useMiddleware('load', perloadDefaultMiddleware());

middlewareHook.useMiddleware('saveConfig', configSaveDefautlMiddleware());

middlewareHook.useMiddleware('saveNote', saveNoteDefaultMiddleware());

middlewareHook.useMiddleware('deleteNote', deleteNoteDefaultMiddleware());

middlewareHook.useMiddleware('recovery', perloadDefaultMiddleware());
