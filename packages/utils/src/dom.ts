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
/**
 * 阻止事件冒泡
 *
 * @param e 事件对象
 */
export function stopPropagation(e: Event) {
  e.stopPropagation();
}

/**
 * 阻止事件的默认行为
 *
 * 此函数用于在事件处理中阻止默认行为，例如阻止表单提交或链接跳转等
 * 它接受一个事件对象作为参数，并调用其preventDefault方法来阻止默认行为
 *
 * @param e 事件对象，包含事件特定的信息和方法
 */
export function preventDefault(e: Event) {
  e.preventDefault();
}
