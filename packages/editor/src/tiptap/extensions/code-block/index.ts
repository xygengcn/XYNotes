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
      content.spellcheck = false; // 关闭语法检查
      for (const [key, value] of Object.entries(mergeAttributes(this.options.HTMLAttributes))) {
        if (value !== undefined && value !== null) {
          parent.setAttribute(key, value);
        }
      }
      let parentLanguage = node.attrs.language;
      parent.setAttribute('data-language', node.attrs.language);
      parent.append(content);
      /**
       * 语言选择框
       *
       * @tips iCloud密码Chrome插件会影响无法输入
       */
      const languageInput = document.createElement('input');
      languageInput.type = 'text';
      languageInput.classList.add('markdown-editor-codeblock-language');
      const onChange = () => {
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
      };
      if (editor.isEditable) {
        languageInput.oninput = stopPropagation;
        languageInput.onkeydown = stopPropagation;
        languageInput.onkeyup = stopPropagation;
        languageInput.onmousedown = stopPropagation;
        languageInput.onmouseup = stopPropagation;

        languageInput.addEventListener('change', onChange);
      } else {
        languageInput.disabled = true;
      }
      languageInput.value = node.attrs.language || 'plaintext';
      parent.append(languageInput);
      return {
        dom: parent,
        contentDOM: content,
        update: (updatedNode) => {
          if (updatedNode.type !== this.type) {
            return false;
          }
          if (parentLanguage !== updatedNode.attrs.language) {
            parentLanguage = updatedNode.attrs.language;
            parent.setAttribute('data-language', updatedNode.attrs.language);
          }
          return true;
        }
      };
    };
  }
});

export default CodeBlockExtension;
