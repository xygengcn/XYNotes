import { Image } from '@tiptap/extension-image';

const ImageExtension = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'markdown-editor-image'
      }
    };
  }
});

export default ImageExtension;
