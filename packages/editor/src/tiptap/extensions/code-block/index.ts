import { mergeAttributes } from '@tiptap/core';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight, all } from 'lowlight';
import { stopPropagation } from '@xynotes/utils';
import { createCodeBlock } from './create-code-bolck';
/**
 * 代码高亮模块
 */
const lowlight = createLowlight(all);
const CodeBlockExtension = CodeBlockLowlight.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      lowlight,
      defaultLanguage: 'plaintext',
      languageClassPrefix: 'language-',
      exitOnArrowDown: true,
      exitOnTripleEnter: true,
      HTMLAttributes: {
        class: 'markdown-editor-codeblock hljs'
      }
    };
  },
  addNodeView() {
    return ({ node, editor, getPos }) => {
      const onChange = (e: Event) => {
        const inputEl = e.target as HTMLInputElement;
        // 不发生变化则不更新
        if (inputEl.value === node.attrs.language) return;
        // 可编辑
        if (editor.isEditable && typeof getPos === 'function') {
          editor.view.dispatch(
            editor.view.state.tr.setNodeMarkup(getPos(), undefined, {
              ...node.attrs,
              language: inputEl.value
            })
          );
        } else {
          // 不可编辑
          inputEl.value = node.attrs.language;
        }
      };
      const { codeBlock, codeContent, input } = createCodeBlock(
        node.attrs.language,
        node.textContent,
        editor.isEditable,
        onChange
      );
      input.value = node.attrs.language || 'plaintext';
      for (const [key, value] of Object.entries(mergeAttributes(this.options.HTMLAttributes))) {
        if (value !== undefined && value !== null) {
          codeBlock.setAttribute(key, value);
        }
      }
      let originLanguage = node.attrs.language;
      return {
        dom: codeBlock,
        contentDOM: codeContent,
        update: (updatedNode) => {
          if (updatedNode.type !== this.type) {
            return false;
          }
          if (originLanguage !== updatedNode.attrs.language) {
            originLanguage = updatedNode.attrs.language;
            codeBlock.setAttribute('data-language', originLanguage);
          }
          return true;
        },
        destroy() {
          input.oninput = null;
          input.onkeydown = null;
          input.onkeyup = null;
          input.onmousedown = null;
          input.onmouseup = null;
          input.onchange = null;
        }
      };
    };
  }
});

export default CodeBlockExtension;
