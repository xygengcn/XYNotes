/**
 * pick 对象
 * @param obj
 * @param attrs
 */
function pick<T extends Record<string, any>, K extends keyof T>(obj: T, attrs: Array<K>): Pick<T, K> {
  if (attrs?.length > 0) {
    const newObject = Object.create({});
    for (const attr of attrs) {
      Reflect.set(newObject, attr, obj[attr]);
    }
    return newObject
  }
  return obj;
}

/**
 * 实现 omit对象
 * @param obj
 * @param attrs
 * @returns
 */
function omit<T extends Record<string, any>, K extends keyof T>(obj: T, attrs: Array<K>): Omit<T, K> {
  if (attrs?.length > 0) {
    const newObject = Object.create(obj);
    for (const attr of attrs) {
      Reflect.deleteProperty(newObject, attr);
    }
    return newObject
  }
  return obj;
}

/**
 * 对象函数
 */
export const object = {
  pick,
  omit
};
