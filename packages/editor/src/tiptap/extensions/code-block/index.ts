import { mergeAttributes } from '@tiptap/core';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';
import { createCodeBlock } from './create-code-block';
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
      const { codeBlock, codeEditor, container, code, onUpdated } = createCodeBlock(
        node.attrs.language,
        node.textContent,
        editor.isEditable,
        onChange
      );
      for (const [key, value] of Object.entries(mergeAttributes(this.options.HTMLAttributes))) {
        if (value !== undefined && value !== null) {
          codeBlock.setAttribute(key, value);
        }
      }

      return {
        dom: codeBlock,
        contentDOM: codeEditor,
        update: (updatedNode) => {
          // 代码更新
          code.value = updatedNode.textContent;
          if (updatedNode.type !== this.type) {
            return false;
          }
          onUpdated(updatedNode);
          return true;
        },
        destroy() {
          container.unmount();
        }
      };
    };
  }
});

export default CodeBlockExtension;
