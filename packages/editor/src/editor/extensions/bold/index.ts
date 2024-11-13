import { markInputRule, markPasteRule } from '@tiptap/core';
import Bold from '@tiptap/extension-bold';

const STAR_INPUT_REGEX = /(?:^|[^*])(\*\*(?!\s+\*\*)([^*]+)\*\*)$/;
const STAR_PASTE_REGEX = /(?:^|[^*])(\*\*(?!\s+\*\*)([^*]+)\*\*(?!\s+\*\*))/g;
const UNDERSCORE_INPUT_REGEX = /(?:^|[^_])(__(?!\s+__)([^_]+)__)$/;
const UNDERSCORE_PASTE_REGEX = /(?:^|[^_])(__(?!\s+__)([^_]+)__(?!\s+__))/g;

const BoldExtension = Bold.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'markdown-editor-bold'
      }
    };
  },
  addInputRules() {
    return [
      markInputRule({
        find: STAR_INPUT_REGEX,
        type: this.type
      }),
      markInputRule({
        find: UNDERSCORE_INPUT_REGEX,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: STAR_PASTE_REGEX,
        type: this.type
      }),
      markPasteRule({
        find: UNDERSCORE_PASTE_REGEX,
        type: this.type
      })
    ];
  }
});

export default BoldExtension;
