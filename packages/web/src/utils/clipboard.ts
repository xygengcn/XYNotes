import * as clipboard from '@tauri-apps/plugin-clipboard-manager';
import is from './is';

/**
 * 读取粘贴板
 * @returns
 */
export function readText() {
  if (is.app()) {
    return clipboard.readText();
  }
  return navigator.clipboard.readText();
}
