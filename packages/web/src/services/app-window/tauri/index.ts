import { invoke } from '@tauri-apps/api/core';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { save } from '@tauri-apps/plugin-dialog';
import { writeFile, writeTextFile } from '@tauri-apps/plugin-fs';
import * as clipboard from '@tauri-apps/plugin-clipboard-manager';
import { Image } from '@tauri-apps/api/image';

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
 * 创建窗口
 * @param options
 * @returns
 */
export function tauriCreateWindow(options: { id: string; url: string }) {
  console.log('[tauri-createWindow]', options);
  // 获取窗口
  let webview = WebviewWindow.getByLabel(options.id);
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
  return webview;
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
export function tauriSetWindowFocus(label: string) {
  const appWindow = WebviewWindow.getByLabel(label);
  return appWindow?.setFocus();
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
export const tauriClipboardReadText = clipboard.readText