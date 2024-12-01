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
