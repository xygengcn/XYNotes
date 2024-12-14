import Link from '@tiptap/extension-link';

const LinkExtension = Link.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      openOnClick: false,
      HTMLAttributes: {
        class: 'markdown-editor-link',
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    };
  }
});

export default LinkExtension;
