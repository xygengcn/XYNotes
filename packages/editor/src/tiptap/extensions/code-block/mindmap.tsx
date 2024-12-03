/**
 * 是不是mind语言
 * @param lang
 * @returns
 */
export function isMindMapLanguage(lang: string) {
  return ['mindmap', 'markmap'].indexOf(lang.toLocaleLowerCase()) > -1;
}

/**
 * 创建mindmap
 * @param dom
 * @param code
 */
export async function createMindMap(dom: HTMLDivElement, code: string) {
  if (dom) {
  }
}

/**
 * 渲染svg
 * @param code
 */
export function mindMapRender(code: string) {
}
