/**
 * pick 对象
 * @param obj
 * @param attrs
 */
export function pick<T extends Record<string, any>, K extends keyof T>(obj: T, attrs: Array<K>): Pick<T, K> {
  if (attrs?.length > 0) {
    const newObject = Object.create({});
    for (const attr of attrs) {
      Reflect.set(newObject, attr, obj[attr]);
    }
    return newObject;
  }
  return obj;
}

/**
 * 实现 omit对象
 * @param obj
 * @param attrs
 * @returns
 */
export function omit<T extends Record<string, any>, K extends keyof T>(obj: T, attrs: Array<K>): Omit<T, K> {
  if (attrs?.length > 0) {
    const newObject = structuredClone(obj);
    for (const attr of attrs) {
      Reflect.deleteProperty(newObject, attr);
    }
    return newObject;
  }
  return obj;
}

/**
 * 判断是否是 blob url
 * @param url
 * @returns
 */
export function isBlobUrl(url: string) {
  return url.startsWith('blob:');
}
