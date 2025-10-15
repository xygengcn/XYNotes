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
    onMaximize: () => {
      if (!document.fullscreenElement) {
        codeBlock.requestFullscreen().then(() => {
          editor.chain().focus().run();
        });
      } else {
        document.exitFullscreen();
      }
    },
    onMinimize: () => {
      if (document.fullscreenElement) document.exitFullscreen();
    },
    onClose: () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        return;
      }
      // 删除此节点
      editor.commands.deleteNode('codeBlock');
    },
    isEditable: editor.isEditable,
    lang: defaultLanguage
  });
  codeContainer.provide('code', code);
  codeContainer.mount(codeBlock);

  // 创建代码内容容器
  const codeContent = document.createElement('div');
  codeContent.className = 'markdown-editor-codeblock-content';

  // 编辑器部分
  const codeEditorWrapper = document.createElement('div');
  codeEditorWrapper.className = 'markdown-editor-codeblock-content-code';
  const codeEditorContent = document.createElement('code');
  codeEditorContent.className = 'markdown-editor-codeblock-content-code-content';
  codeEditorContent.textContent = code.value;
  codeEditorContent.setAttribute('spellcheck', 'false');
  codeEditorWrapper.appendChild(codeEditorContent);
  codeContent.appendChild(codeEditorWrapper);

  // 预览部分
  // 将头部容器和代码内容容器添加到根元素
  const codePreviewWrapper = document.createElement('div');
  const codePreview = document.createElement('code-preview') as HTMLDivElement;
  codePreviewWrapper.className = 'markdown-editor-codeblock-content-preview';
  codePreviewWrapper.appendChild(codePreview);
  codeContent.appendChild(codePreviewWrapper);
  codeBlock.appendChild(codeContent);

  const setCodePreview = (language: string, code: string) => {
    // @ts-ignore
    codePreview.language = language || 'plaintext';
    // @ts-ignore
    codePreview.code = code || '';
    // 设置隐藏
    if (isPreviewLanguage(language)) {
      codeContent.classList.add('has-preview');
      codePreviewWrapper.style.display = 'block';
    } else {
      codePreviewWrapper.style.display = 'none';
    }
  };
  setCodePreview(defaultLanguage, defaultCode);

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
    codeEditor: codeEditorContent,
    codePreview,
    container: codeContainer,
    code,
    onUpdated
  };
}
