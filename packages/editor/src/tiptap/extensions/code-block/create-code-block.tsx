import { Editor } from '@tiptap/core';
import { Node } from '@tiptap/pm/model';
import { createApp, ref } from 'vue';
import CodeBlockContainer from './container';
import './index.scss';
import './preview';
import { isPreviewLanguage } from './preview';

/**
 * 创建view
 * @param node
 * @param editor
 * @param onChange
 * @returns
 */
export function createCodeBlockView(node: Node, editor: Editor, onChange: (e: Event) => void) {
  console.log("[editor] code-block")
  const defaultLanguage = node.attrs.language;
  const defaultCode = node.textContent;
  // 创建根元素
  const codeBlock = document.createElement('pre');
  codeBlock.className = 'markdown-editor-codeblock';
  codeBlock.setAttribute('data-language', defaultLanguage);

  // 代码
  const code = ref(defaultCode);

  // 创建vue，挂载
  const codeContainer = createApp(CodeBlockContainer, {
    onChange,
    isEditable: editor.isEditable,
    lang: defaultLanguage
  });
  codeContainer.provide('code', code);
  codeContainer.mount(codeBlock);

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
  const codePreview = document.createElement('code-preview') as HTMLDivElement;
  const setCodePreview = (language: string, code: string) => {
    // @ts-ignore
    codePreview.language = language || 'plaintext';
    // @ts-ignore
    codePreview.code = code || '';
    // 设置隐藏
    if (isPreviewLanguage(language)) {
      codePreview.style.display = 'block';
    } else {
      codePreview.style.display = 'none';
    }
  };
  setCodePreview(defaultLanguage, defaultCode);

  // 将头部容器和代码内容容器添加到根元素
  const div =document.createElement("div")
  div.className = 'markdown-editor-codeblock-content-preview';
  div.appendChild(codePreview)
  codeContent.appendChild(div);
  codeBlock.appendChild(codeContent);

  // 上一个语言
  let originLanguage = defaultLanguage;

  //内容更新
  const onUpdated = (node: Node) => {
    if (originLanguage !== node.attrs.language) {
      originLanguage = node.attrs.language;
      codeBlock.setAttribute('data-language', originLanguage);
      codePreview.innerHTML = '';
    }
    setCodePreview(node.attrs.language, node.textContent);
  };
  return {
    codeBlock,
    codeEditor,
    codePreview,
    container: codeContainer,
    code,
    onUpdated
  };
}
