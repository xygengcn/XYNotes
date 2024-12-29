import { mergeAttributes } from '@tiptap/core';
import { Image, ImageOptions } from '@tiptap/extension-image';
import { Plugin, PluginKey } from '@tiptap/pm/state';

const ImageExtension = Image.extend<ImageOptions & { upload?: (files: FileList, event: Event) => void }>({
  addAttributes() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'markdown-editor-image'
      }
    };
  },
  addNodeView() {
    return ({ node, editor }) => {
      const dom = document.createElement('img-viewer') as HTMLImageElement;
      dom.classList.add('markdown-editor-image');
      for (const [key, value] of Object.entries(
        mergeAttributes(this.options.HTMLAttributes, node.attrs, { isEditable: editor.isEditable })
      )) {
        if (value !== undefined && value !== null) {
          dom.setAttribute(key, value);
        }
      }
      return {
        dom
      };
    };
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey(`img-handler`),
        props: {
          handlePaste: (_view, event) => {
            const editable = this.editor.isEditable;
            const { clipboardData } = event;
            if (!editable || !clipboardData || clipboardData.files.length === 0) {
              return false;
            }
            if (typeof this.options.upload === 'function') {
              this.options.upload(clipboardData.files, event);
            }
            // @ts-ignore
            this.editor.emit('upload', clipboardData.files, event);
            return true;
          },
          handleDrop: (_view, event) => {
            if (!(event instanceof DragEvent) || !this.editor.isEditable) {
              return false;
            }
            const { files } = event.dataTransfer ?? {};
            if (!files || files.length <= 0) {
              return false;
            }
            if (typeof this.options.upload === 'function') {
              this.options.upload(files, event);
            }
            // @ts-ignore
            this.editor.emit('upload', files, event);
            return true;
          }
        }
      })
    ];
  }
});

export default ImageExtension;
