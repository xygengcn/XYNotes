import { mergeAttributes } from '@tiptap/core';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight, all } from 'lowlight';
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
    return ({ node }) => {
      const parent = document.createElement('pre');
      const content = document.createElement('code');
      for (const [key, value] of Object.entries(mergeAttributes(this.options.HTMLAttributes))) {
        if (value !== undefined && value !== null) {
          parent.setAttribute(key, value);
        }
      }
      parent.setAttribute('data-language', node.attrs.language);
      parent.append(content);
      return {
        dom: parent,
        contentDOM: content
      };
    };
  }
});

export default CodeBlockExtension;
