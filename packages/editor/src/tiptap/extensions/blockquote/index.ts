import Blockquote from '@tiptap/extension-blockquote';

const BlockquoteExtension = Blockquote.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'markdown-editor-blockquote'
      }
    };
  }
});

export default BlockquoteExtension;
