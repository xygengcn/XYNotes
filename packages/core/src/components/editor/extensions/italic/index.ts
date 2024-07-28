import { markInputRule, markPasteRule } from '@tiptap/core';
import Italic from '@tiptap/extension-italic';

const STAR_INPUT_REGEX = /(?:^|[^*])(\*(?!\s+\*)([^*]+)\*)$/;
const STAR_PASTE_REGEX = /(?:^|[^*])(\*(?!\s+\*)([^*]+)\*(?!\s+\*))/g;
const UNDERSCORE_INPUT_REGEX = /(?:^|[^_])(_(?!\s+_)([^_]+)_)$/;
const UNDERSCORE_PASTE_REGEX = /(?:^|[^_])(_(?!\s+_)([^_]+)_(?!\s+_))/g;

const ItalicExtension = Italic.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'markdown-editor-italic'
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

export default ItalicExtension;
