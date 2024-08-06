import is from './is';

/**
 * 读取粘贴板
 * @returns
 */
export function readText() {
  if (is.app()) {
    return window.$appWindow.clipboardReadText();
  }
  return navigator.clipboard.readText();
}

/**
 * 复制
 * @param blob
 * @returns
 */
export async function copyBlob(blob: Blob | null): Promise<any> {
  if (blob) {
    if (is.app()) {
      return window.$appWindow.clipboardWriteImage(blob);
    }
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
  return Promise.reject('Unable to write to clipboard.');
}

/**
 * 复制文本
 * @param text
 * @returns
 */
export function copyText(text: string): Promise<any> {
  return navigator.clipboard.writeText(text).then(
    () => {
      return Promise.resolve();
    },
    () => {
      return Promise.reject('Unable to write to clipboard.');
    }
  );
}
