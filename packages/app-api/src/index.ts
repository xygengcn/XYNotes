import {
  isTauriApp,
  tauriClipboardReadText,
  tauriClipboardWriteImage,
  tauriCloseCurrentWindow,
  tauriCreateWindow,
  tauriGetWindow,
  tauriIsMaximized,
  tauriMaximize,
  tauriMinimize,
  tauriOpenDevtools,
  tauriRegisterShortcut,
  tauriSetCurrentWindowFocus,
  tauriSetWindowFocus,
  tauriShowDirDialog,
  tauriShowMainWindow,
  tauriUnmaximize,
  tauriUnRegisterAll,
  tauriWriteFile,
  tauriWriteTextFile
} from '@xynotes/tauri-api';

/**
 * 创建窗口
 * @param options
 * @returns
 */
export function createWindow(options: { nid: string }) {
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
export function openDevtools(flag: boolean) {
  // tauri
  if (isTauriApp()) {
    return tauriOpenDevtools(flag);
  }
}

/**
 * 当前窗口聚焦
 * @returns
 */
export function setCurrentWindowFocus() {
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
export function setWindowFocus(nid: string) {
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
export async function exsitAppWindow(nid: string): Promise<boolean> {
  // tauri
  if (isTauriApp()) {
    const label = `nid-${nid}`;
    const webwindow = await tauriGetWindow(label);
    return !!webwindow;
  }
  return false;
}

/**
 * 是不是最大化
 * @returns
 */
export function isMaximized(): Promise<boolean> | void {
  // tauri
  if (isTauriApp()) {
    return tauriIsMaximized();
  }
}

/**
 * 取消最大化
 * @returns
 */
export function unmaximize() {
  // tauri
  if (isTauriApp()) {
    return tauriUnmaximize();
  }
}

/**
 * 最大化
 * @returns
 */
export function maximize() {
  // tauri
  if (isTauriApp()) {
    return tauriMaximize();
  }
}

/**
 * 关闭窗口
 * @returns
 */
export function closeWindow() {
  // tauri
  if (isTauriApp()) {
    return tauriCloseCurrentWindow();
  }
}

/**
 * 最小化
 * @returns
 */
export function minimize() {
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
export function writeTextFile(path: string, text: string) {
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
export function writeFile(path: string | URL, data: Uint8Array) {
  // tauri
  if (isTauriApp()) {
    /**
     * fix: 修复中文保存问题 writeFile fails with error "unexpected invoke body"
     * @see https://github.com/tauri-apps/plugins-workspace/issues/1478
     * @link https://github.com/tauri-apps/plugins-workspace/pull/1640
     */
    if (typeof path === 'string') {
      if (path.startsWith('file:')) {
        path = new URL(encodeURI(path));
      } else {
        path = new URL('file://' + encodeURI(path));
      }
    }
    return tauriWriteFile(path, data, { create: true });
  }
}

/**
 * 选择弹窗
 */
export function showDirDialog(options: { title: string; defaultPath?: string }): Promise<string | null> | void {
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
export function clipboardWriteImage(blob: Blob) {
  // tauri
  if (isTauriApp()) {
    return tauriClipboardWriteImage(blob);
  }
}

/**
 * 粘贴板读取
 * @returns
 */
export function clipboardReadText(): Promise<string> | void {
  // tauri
  if (isTauriApp()) {
    return tauriClipboardReadText();
  }
}

/**
 * 注册快捷键
 * @param key
 * @param handler
 * @returns
 */
export function registerShortcut(key: string, handler: (event: any) => void) {
  // tauri
  if (isTauriApp()) {
    return tauriRegisterShortcut(key, handler);
  }
}

/**
 * 注册快捷键
 * @param key
 * @param handler
 * @returns
 */
export function unregisterAllShortcut() {
  // tauri
  if (isTauriApp()) {
    return tauriUnRegisterAll();
  }
}

/**
 * 显示主界面
 * @returns
 */
export function showMainWindow() {
  // tauri
  if (isTauriApp()) {
    return tauriShowMainWindow();
  }
}
