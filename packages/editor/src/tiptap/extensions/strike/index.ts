import { markInputRule, markPasteRule } from '@tiptap/core';
import Strike from '@tiptap/extension-strike';

const INPUT_REGEX = /(?:^|[^~])(~~(?!\s+~~)([^~]+)~~)$/;
const PASTE_REGEX = /(?:^|[^~])(~~(?!\s+~~)([^~]+)~~(?!\s+~~))/g;

const StrikeExtension = Strike.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'markdown-editor-strike'
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

export default StrikeExtension;
