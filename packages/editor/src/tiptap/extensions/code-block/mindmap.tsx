import { MindMarkElement } from '@xynotes/mindmark';
import '@xynotes/mindmark/dist/style.css';

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
    const mindMark = document.createElement('mind-mark');
    if (mindMark) {
      // @ts-ignore
      mindMark.markdown = code;
    }
    dom.appendChild(mindMark);
  }
}

/**
 * 渲染svg
 * @param code
 */
export function mindMapRender(dom: HTMLDivElement, code: string) {
  if (dom.firstChild?.nodeName === 'MIND-MARK') {
    // @ts-ignore
    dom.firstChild.markdown = code;
  }
}

// 定义自定义元素
// 检查自定义元素是否已经注册
if (!customElements.get('mind-mark')) {
  // 定义自定义元素
  customElements.define('mind-mark', MindMarkElement);
}
