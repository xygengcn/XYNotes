import '@xynotes/mindmark/dist/style.css';

/**
 * 是不是mind语言
 * @param lang
 * @returns
 */
export function isMindMapLanguage(lang: string) {
  const match = ['mindmap', 'markmap'].indexOf(lang.toLocaleLowerCase()) > -1;
  // 检查自定义元素是否已经注册
  if (match) {
    import('@xynotes/mindmark').then(({ MindMarkElement }) => {
      // 定义自定义元素
      if (!customElements.get('mind-mark')) {
        customElements.define('mind-mark', MindMarkElement);
      }
    });
  }
  return match;
}
