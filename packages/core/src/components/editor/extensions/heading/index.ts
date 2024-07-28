import Heading from '@tiptap/extension-heading';

const HeadingExtension = Heading.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'markdown-editor-heading'
      }
    };
  }
});

export default HeadingExtension;
