/**
 * 客户端注册
 */

import Confirm from '@/components/common/confirm';
import Toast from '@/components/common/toast';
import is from '@/utils/is';
import { invoke } from '@tauri-apps/api';
import { WebviewWindow, appWindow } from '@tauri-apps/api/window';
import middlewareHook from '@/middlewares';
import { configSaveDefautlMiddleware } from '@/middlewares/config.middleware';
import { deleteNoteDefaultMiddleware, saveNoteDefaultMiddleware } from '@/middlewares/note.middleware';
import perloadDefaultMiddleware from '@/middlewares/preload.middleware';

/**
 * 注册客户端事件
 */
if (is.app()) {
  // 打开控制台
  window.openDevtools = (flag: boolean) => {
    invoke('open_devtools', { label: appWindow.label, flag });
  };

  // 创建窗口
  window.createWindow = (options: { nid: string; remoteId: string }) => {
    console.log('[createWindow]', options);
    const webviewId = `nid-${options.nid}`;

    // 获取窗口
    let webview = WebviewWindow.getByLabel(webviewId);
    if (webview) {
      webview.setFocus();
      return;
    }

    webview = new WebviewWindow(webviewId, {
      url: `/detail?nid=${options.nid}&remoteId=${options.remoteId}`,
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
  window.show = () => {
    appWindow.show();
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
