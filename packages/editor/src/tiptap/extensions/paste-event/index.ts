import { Editor, Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

/**
 * 处理粘贴和复制
 */
const PasteExtension = Extension.create({
  name: 'PasteExtension',
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey(`paste-handler`),
        props: {
          handlePaste: (_view, event) => {
            event.preventDefault();
            const editable = this.editor.isEditable;
            const { clipboardData } = event;
            if (!editable || !clipboardData || clipboardData.files.length === 0) {
              return false;
            }
            const files = clipboardData.files;
            // @ts-ignore
            this.editor.emit('upload', files, event);
          },
          handleDrop: (_view, event) => {
            if (!(event instanceof DragEvent) || !this.editor.isEditable) {
              return false;
            }
            const { files } = event.dataTransfer ?? {};
            if (!files || files.length <= 0) {
              return false;
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

export default PasteExtension;
