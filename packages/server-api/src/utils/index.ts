/**
 * 是不是字符串
 *
 *
 */
export function isString(str: unknown, force: boolean = false): boolean {
  if (force) {
    return typeof str === 'string' && !!str.trim();
  }
  return typeof str === 'string';
}
