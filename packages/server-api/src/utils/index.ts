import parse from 'fast-json-parse';
import { MakeDirectoryOptions, existsSync, mkdirSync, statSync } from 'fs';

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
/**
 * 创建多级目录，默认递归
 * @param fullPath 路径
 * @param option 属性
 * @returns
 */
export function ensureDir(fullPath: string, option: MakeDirectoryOptions & { recursive: true } = { recursive: true }) {
  try {
    if (existsSync(fullPath)) return true;
    return mkdirSync(fullPath, option);
  } catch (error) {
    return false;
  }
}

/**
 * 文件
 * @param path
 * @returns
 */
export function isFile(path: string): boolean {
  if (existsSync(path)) {
    const stat = statSync(path);
    return stat?.isFile();
  }
  return false;
}

/**
 * json
 * @param str
 * @returns
 */
export function parseJson(str: string) {
  if (!isString(str)) return null;
  const result = parse(str);
  if (result.err) {
    return null;
  }
  return result.value;
}
