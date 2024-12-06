// HTML转义
export function htmlEncode(html: string): string {
  const temp = document.createElement('span');
  temp.textContent != null ? (temp.textContent = html) : (temp.innerText = html);
  const output = temp.innerHTML;
  return output;
}

/**
 * 高亮算法
 * @param keyword
 * @param text
 * @returns
 */
export function highLight(keyword: string, text: string): string {
  if (!keyword || !text) return text;
  const keys = keyword.split('|') || [];
  return keys.reduce((str: string, key: string) => {
    // 正则匹配所有的文本
    return htmlEncode(str).replace(new RegExp(`(${key})`, 'ig'), `<b>$1</b>`);
  }, text);
}

/**
 * 是不是字符串
 * @param str
 * @returns
 */
export function isString(str: unknown): boolean {
  return typeof str === 'string';
}

/**
 * blob to string
 * @param blob
 * @returns
 */
export function blob2String(blob: Blob): Promise<string> {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.readAsText(blob, 'utf-8');
    reader.onload = function (e) {
      resolve(reader.result as string);
    };
  });
}

/**
 * 去除字符串空格和tab
 * @param str
 * @returns
 */
export function trim(str: string) {
  if (!isString(str)) return '';
  return str?.trim().replace(/\t/g, ' ') || '';
}

/**
 * 生成唯一值
 * @returns
 */
export function uuid(): string {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  const blob = URL.createObjectURL(new Blob());
  const blobArr = blob.toString().split('/');
  URL.revokeObjectURL(blob);
  return (blobArr?.length && blobArr[blobArr.length - 1]) || window.btoa(new Date().getTime().toString());
}
