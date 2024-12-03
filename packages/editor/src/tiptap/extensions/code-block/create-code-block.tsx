import { Node } from '@tiptap/pm/model';
import { createApp, ref } from 'vue';
import CodeBlockContainer from './container';
import "./index.scss";
import { isMindMapLanguage } from './mindmap';

/**
 * 是不是可以预览的语言
 * @param lang
 */
const isPreviewLanguage = (lang: string) => {
  return isMindMapLanguage(lang);
};

export function createCodeBlock(
  defaultLanguage: string,
  defaultCode: string,
  isEditable: boolean,
  onChange: (e) => void
) {
  // 创建根元素
  const codeBlock = document.createElement('pre');
  codeBlock.className = 'markdown-editor-codeblock';
  codeBlock.setAttribute('data-language', defaultLanguage);

  // 代码
  const code = ref(defaultCode);

  // 创建vue，挂载
  const container = createApp(CodeBlockContainer, {
    onChange,
    isEditable,
    lang: defaultLanguage
  });

  container.provide('code', code);
  container.mount(codeBlock);

  // 创建代码内容容器
  const codeContent = document.createElement('div');
  codeContent.className = 'markdown-editor-codeblock-content';

  // 编辑器部分
  const codeEditor = document.createElement('code');
  codeEditor.className = 'markdown-editor-codeblock-content-code';
  codeEditor.textContent = code.value;
  codeEditor.setAttribute('spellcheck', 'false');
  codeContent.appendChild(codeEditor);

  // 预览部分
  const codePreview = document.createElement('div');
  codePreview.className = 'markdown-editor-codeblock-content-preview';
  if (isPreviewLanguage(defaultLanguage)) {
    codeContent.appendChild(codePreview);
  }

  // 将头部容器和代码内容容器添加到根元素
  codeBlock.appendChild(codeContent);

  //内容更新
  const onUpdated = (node: Node) => {
    console.log("[editor] code-block",node)
  };
  return {
    codeBlock,
    codeEditor,
    codePreview,
    container,
    code,
    onUpdated
  };
}
