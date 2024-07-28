import { markInputRule, markPasteRule } from '@tiptap/core';
import Code from '@tiptap/extension-code';

const INPUT_REGEX = /(?:^|[^`])(`(?!\s+`)([^`]+)`)$/;
const PASTE_REGEX = /(?:^|[^`])(`(?!\s+`)([^`]+)`(?!\s+`))/g;

const CodeExtension = Code.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'markdown-editor-code'
      }
    };
  },
  addInputRules() {
    return [
      markInputRule({
        find: INPUT_REGEX,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: PASTE_REGEX,
        type: this.type
      })
    ];
  }
});

export default CodeExtension;
