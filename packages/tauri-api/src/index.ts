import { invoke } from '@tauri-apps/api/core';
import { Image } from '@tauri-apps/api/image';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import * as clipboard from '@tauri-apps/plugin-clipboard-manager';
import { save } from '@tauri-apps/plugin-dialog';
import { writeFile, writeTextFile } from '@tauri-apps/plugin-fs';
import { isRegistered, register, ShortcutEvent, unregisterAll } from '@tauri-apps/plugin-global-shortcut';

/**
 * 判断是不是tauri客户端
 * @returns
 */
export function isTauriApp(): boolean {
  return window.__TAURI_INTERNALS__;
}

/**
 * 获取显示当前窗口
 */
export function tauriShowCurrentWindow() {
  const appWindow = WebviewWindow.getCurrent();
  return appWindow.show();
}

/**
 * 获取显示主窗口
 */
export async function tauriShowMainWindow() {
  const appWindow = await WebviewWindow.getByLabel('main');
  return appWindow.show();
}

/**
 * 创建窗口
 * @param options
 * @returns
 */
export async function tauriCreateWindow(options: { id: string; url: string }) {
  console.log('[tauri-createWindow]', options);
  // 获取窗口
  let webview = await WebviewWindow.getByLabel(options.id);
  if (webview) {
    webview.show();
    webview.setFocus();
    return;
  }
  webview = new WebviewWindow(options.id, {
    url: options.url,
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
  return;
}

/**
 * 打开控制台
 * @param flag
 * @returns
 */
export function tauriOpenDevtools(flag: boolean) {
  const appWindow = WebviewWindow.getCurrent();
  return invoke('open_devtools', { label: appWindow.label, flag });
}

/**
 * 当前窗口聚焦
 */
export function tauriSetCurrentWindowFocus() {
  const appWindow = WebviewWindow.getCurrent();
  return appWindow.setFocus();
}

/**
 * 窗口聚焦
 * @param label
 */
export async function tauriSetWindowFocus(label: string) {
  const appWindow = await WebviewWindow.getByLabel(label);
  if (appWindow) {
    appWindow.show();
    appWindow.setFocus();
  }
}

/**
 * 获取窗口
 * @param label
 */
export function tauriGetWindow(label: string) {
  const appWindow = WebviewWindow.getByLabel(label);
  return appWindow || undefined;
}

/**
 * 是不是最大化
 * @returns
 */
export function tauriIsMaximized() {
  const appWindow = WebviewWindow.getCurrent();
  return appWindow.isMaximized();
}

/**
 * 取消最大化
 * @returns
 */
export function tauriUnmaximize() {
  const appWindow = WebviewWindow.getCurrent();
  return appWindow.unmaximize();
}

/**
 * 判断当前窗口是否为主窗口
 *
 * 该函数通过获取当前的WebviewWindow实例，并检查其label属性是否为"main"，来判断当前窗口是否为主窗口
 * 主窗口通常是指应用程序启动时的第一个窗口，或具有核心功能的窗口
 *
 * @returns {boolean} 如果当前窗口为主窗口，则返回true；否则返回false
 */
export function tauriIsMainWindow(): boolean {
  // 获取当前的WebviewWindow实例
  const appWindow = WebviewWindow.getCurrent();
  // 检查当前窗口的label属性是否为"main"
  return appWindow.label === 'main';
}

/**
 * 最大化
 * @returns
 */
export function tauriMaximize() {
  const appWindow = WebviewWindow.getCurrent();
  return appWindow.maximize();
}

/**
 * 最小化
 * @returns
 */
export function tauriMinimize() {
  const appWindow = WebviewWindow.getCurrent();
  return appWindow.minimize();
}

/**
 * 关闭
 * @returns
 */
export function tauriCloseCurrentWindow() {
  const appWindow = WebviewWindow.getCurrent();
  /**
   * 如果是主窗口，则隐藏，否则关闭
   */
  if (WebviewWindow.length > 1 && appWindow.label === 'main') {
    return appWindow.minimize();
  }
  return appWindow.close();
}

/**
 * 写入文件
 */
export const tauriWriteTextFile = writeTextFile;
export const tauriWriteFile = writeFile;

/**
 * 目录选择弹窗
 */
export const tauriShowDirDialog = save;

/**
 * 粘贴板写入
 * @param blob
 * @returns
 */
export async function tauriClipboardWriteImage(blob: Blob) {
  return clipboard.writeImage(await Image.fromBytes(await blob.arrayBuffer()));
}

/**
 * 粘贴板读取文本
 */
export const tauriClipboardReadText = clipboard.readText;

/**
 * 注册快捷键
 */
export const tauriRegisterShortcut = async (key: string, handler: (event: ShortcutEvent) => void) => {
  const isKeyRegistered = await isRegistered(key);

  if (isKeyRegistered) {
    return Promise.reject('快捷键冲突');
  }

  return register(key, handler);
};

/**
 * 取消所有快捷键
 */
export const tauriUnRegisterAll = unregisterAll;
