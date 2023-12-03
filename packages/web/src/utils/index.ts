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
 * 复制
 * @param blob
 * @returns
 */
export function copy(blob: Blob | null): Promise<any> {
  if (blob) {
    const data = [
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ];
    return navigator.clipboard.write(data).then(
      () => {
        return Promise.resolve();
      },
      () => {
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

/**
 * compose函数
 * @param middlewares
 * @returns
 */
export function compose(middlewares: Array<Function>) {
  return function (...args: any) {
    return dispatch(0);
    function dispatch(i: number) {
      let fn = middlewares[i];
      if (!fn) {
        return Promise.resolve();
      }

      return Promise.resolve(
        fn(function next() {
          return dispatch(i + 1);
        }, ...args)
      );
    }
  };
}

/**
 * 寻找节点
 * @param element
 * @returns
 */
export function findParentWithNodrag(element: HTMLElement): string | boolean | null {
  // 从当前元素开始向上遍历父级元素
  let currentElement = element;
  while (currentElement) {
    // 检查当前元素是否有 data-nodrag 属性
    if (currentElement.dataset.nodrag) {
      // 如果有，返回当前元素
      return currentElement.dataset.nodrag;
    }
    // 否则，继续向上查找
    currentElement = currentElement.parentElement;
  }
  // 如果没有找到带有 data-nodrag 属性的父级元素，则返回 null
  return null;
}
