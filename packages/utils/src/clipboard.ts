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
