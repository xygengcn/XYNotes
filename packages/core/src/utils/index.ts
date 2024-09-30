/**
 * 阻止事件冒泡
 *
 * @param e 事件对象
 */
export function stopPropagation(e: Event) {
  e.stopPropagation();
}
