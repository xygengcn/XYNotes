/**
 * 防抖
 * @param key 唯一值
 * @param delay
 * @param fn
 */
window.debounceMap = new Map();
export const debounceMap = (key: string, callback: Function, delay: number = 300) => {
  if (!key) throw Error('key is exist!');
  let timer: number = 0;
  return function (...args: any[]) {
    timer = window.debounceMap.get(key);
    timer && window.clearTimeout(timer);
    // @ts-ignore
    const self = this;
    timer = window.setTimeout(function () {
      callback.apply(self, args);
      timer && window.clearTimeout(timer);
      window.debounceMap.delete(key);
    }, delay);
    window.debounceMap.set(key, timer);
  };
};
