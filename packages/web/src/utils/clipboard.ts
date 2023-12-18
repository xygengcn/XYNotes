import { clipboard } from '@tauri-apps/api';
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
