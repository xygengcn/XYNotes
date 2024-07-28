import Paragraph from '@tiptap/extension-paragraph';

const ParagraphExtension = Paragraph.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'markdown-editor-paragraph'
      }
    };
  }
});

export default ParagraphExtension;
