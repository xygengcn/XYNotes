/**
 * 防抖
 * @param callback
 * @param delay
 * @returns
 */
export function debounce(callback: Function, delay = 300) {
  let timer: number = 0;
  return function (...args: any[]) {
    // 因为这里返回出去的方法是被 外部元素调用的,
    // 所以这里的 this 就指向了外部元素
    // @ts-ignore
    const self = this;
    timer && window.clearTimeout(timer);
    timer = window.setTimeout(function () {
      // apply: 作用就是改变方法内部this的指向, 并能将参数传递给该方法, 最后立即执行这个函数
      callback.apply(self, args);
    }, delay);
    return timer;
  };
}

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
      window.debounceMap.delete(key);
    }, delay);
    window.debounceMap.set(key, timer);
  };
};
