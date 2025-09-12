import { clipboardReadText, clipboardWriteImage } from '@xynotes/app-api';
import is from './is';

/**
 * 读取粘贴板
 * @returns
 */
export function readText() {
  if (is.app()) {
    return clipboardReadText();
  }
  // 检查navigator.clipboard是否存在
  if (navigator.clipboard && navigator.clipboard.readText) {
    return navigator.clipboard.readText();
  }
  return Promise.reject('Clipboard API is not available.');
}

/**
 * 复制
 * @param blob
 * @returns
 */
export async function copyBlob(blob: Blob | null): Promise<any> {
  if (blob) {
    if (is.app()) {
      return clipboardWriteImage(blob);
    }
    // 检查navigator.clipboard是否存在
    if (navigator.clipboard && navigator.clipboard.write) {
      const data = [
        new ClipboardItem({
          [blob.type]: blob
        })
      ];
      return navigator.clipboard.write(data).then(
        () => {
          return Promise.resolve();
        },
        (e) => {
          return Promise.reject('Unable to write to clipboard.');
        }
      );
    }
    return Promise.reject('Clipboard API is not available.');
  }
  return Promise.reject('Unable to write to clipboard.');
}

/**
 * 复制文本
 * @param text
 * @returns
 */
export function copyText(text: string): Promise<any> {
  // 检查navigator.clipboard是否存在
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(
      () => {
        return Promise.resolve();
      },
      () => {
        return Promise.reject('Unable to write to clipboard.');
      }
    );
  }

  // 降级方案：使用document.execCommand
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    if (successful) {
      return Promise.resolve();
    } else {
      return Promise.reject('Unable to write to clipboard.');
    }
  } catch (err) {
    document.body.removeChild(textArea);
    return Promise.reject('Unable to write to clipboard.');
  }
}
