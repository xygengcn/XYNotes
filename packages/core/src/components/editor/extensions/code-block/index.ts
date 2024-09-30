import { mergeAttributes } from '@tiptap/core';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight, all } from 'lowlight';
import { stopPropagation } from '@/utils';
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
      const parent = document.createElement('pre');
      /**
       * 插入主体
       */
      const content = document.createElement('code');
      for (const [key, value] of Object.entries(mergeAttributes(this.options.HTMLAttributes))) {
        if (value !== undefined && value !== null) {
          parent.setAttribute(key, value);
        }
      }
      parent.setAttribute('data-language', node.attrs.language);
      parent.append(content);
      /**
       * 语言选择框
       */
      const languageInput = document.createElement('input');
      languageInput.classList.add('markdown-editor-codeblock-language');
      if (editor.isEditable) {
        languageInput.oninput = stopPropagation;
        languageInput.onkeydown = stopPropagation;
        languageInput.addEventListener('change', () => {
          // 不发生变化则不更新
          if (languageInput.value === node.attrs.language) return;
          // 可编辑
          if (editor.isEditable && typeof getPos === 'function') {
            editor.view.dispatch(
              editor.view.state.tr.setNodeMarkup(getPos(), undefined, {
                ...node.attrs,
                language: languageInput.value
              })
            );
          } else {
            // 不可编辑
            languageInput.value = node.attrs.language;
          }
        });
      } else {
        languageInput.disabled = true;
      }
      languageInput.value = node.attrs.language;

      parent.append(languageInput);
      return {
        dom: parent,
        contentDOM: content,
        update: (updatedNode) => {
          parent.setAttribute('data-language', updatedNode.attrs.language);
          return true;
        }
      };
    };
  }
});

export default CodeBlockExtension;
