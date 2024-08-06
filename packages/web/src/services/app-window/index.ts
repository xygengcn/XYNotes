import {
  tauriCreateWindow,
  isTauriApp,
  tauriOpenDevtools,
  tauriSetCurrentWindowFocus,
  tauriSetWindowFocus,
  tauriGetWindow,
  tauriIsMaximized,
  tauriUnmaximize,
  tauriMaximize,
  tauriCloseCurrentWindow,
  tauriMinimize,
  tauriWriteTextFile,
  tauriShowDirDialog,
  tauriWriteFile,
  tauriClipboardWriteImage,
  tauriClipboardReadText
} from './tauri';

/**
 * 创建窗口
 * @param options
 * @returns
 */
function createWindow(options: { nid: string }) {
  console.log('[createWindow]', options);
  const windowId = `nid-${options.nid}`;
  const windowLocationUrl = `/detail?nid=${options.nid}`;
  // tauri
  if (isTauriApp()) {
    return tauriCreateWindow({ id: windowId, url: windowLocationUrl });
  }
}

/**
 * 打开控制台
 * @param flag
 * @returns
 */
function openDevtools(flag: boolean) {
  // tauri
  if (isTauriApp()) {
    return tauriOpenDevtools(flag);
  }
}

/**
 * 当前窗口聚焦
 * @returns
 */
function setCurrentWindowFocus() {
  // tauri
  if (isTauriApp()) {
    return tauriSetCurrentWindowFocus();
  }
}

/**
 * 窗口聚焦
 * @param nid
 * @returns
 */
function setWindowFocus(nid: string) {
  // tauri
  if (isTauriApp()) {
    const label = `nid-${nid}`;
    return tauriSetWindowFocus(label);
  }
}

/**
 * 判断窗口是否存在
 * @param nid
 * @returns
 */
function exsitAppWindow(nid: string): boolean {
  // tauri
  if (isTauriApp()) {
    const label = `nid-${nid}`;
    return !!tauriGetWindow(label);
  }

  return false;
}

/**
 * 是不是最大化
 * @returns
 */
function isMaximized(): Promise<boolean> {
  // tauri
  if (isTauriApp()) {
    return tauriIsMaximized();
  }
}

/**
 * 取消最大化
 * @returns
 */
function unmaximize() {
  // tauri
  if (isTauriApp()) {
    return tauriUnmaximize();
  }
}

/**
 * 最大化
 * @returns
 */
function maximize() {
  // tauri
  if (isTauriApp()) {
    return tauriMaximize();
  }
}

/**
 * 关闭窗口
 * @returns
 */
function closeWindow() {
  // tauri
  if (isTauriApp()) {
    return tauriCloseCurrentWindow();
  }
}

/**
 * 最小化
 * @returns
 */
function minimize() {
  // tauri
  if (isTauriApp()) {
    return tauriMinimize();
  }
}

/**
 * 写入文本文件
 * @param path
 * @param text
 * @returns
 */
function writeTextFile(path: string, text: string) {
  // tauri
  if (isTauriApp()) {
    return tauriWriteTextFile(path, text);
  }
}

/**
 * 写入文件
 * @param path
 * @param data
 * @returns
 */
function writeFile(path: string, data: Uint8Array) {
  // tauri
  if (isTauriApp()) {
    return tauriWriteFile(path, data, { create: true });
  }
}

/**
 * 选择弹窗
 */
function showDirDialog(options: { title: string; defaultPath?: string }): Promise<string> {
  // tauri
  if (isTauriApp()) {
    return tauriShowDirDialog(options);
  }
}

/**
 * 粘贴板写入图片
 * @param blob
 * @returns
 */
function clipboardWriteImage(blob: Blob) {
  // tauri
  if (isTauriApp()) {
    return tauriClipboardWriteImage(blob);
  }
}

/**
 * 粘贴板读取
 * @returns
 */
function clipboardReadText(): Promise<string> {
  // tauri
  if (isTauriApp()) {
    return tauriClipboardReadText();
  }
}

/**
 * 聚合
 */
const appWindow = {
  createWindow,
  openDevtools,
  setCurrentWindowFocus,
  setWindowFocus,
  hasAppWindow: exsitAppWindow,
  isMaximized,
  unmaximize,
  maximize,
  closeWindow,
  minimize,
  writeTextFile,
  showDirDialog,
  writeFile,
  clipboardWriteImage,
  clipboardReadText
};

// 注入
window.$appWindow = appWindow;

/**
 * 类型
 */
export type IAppWindow = typeof appWindow;
