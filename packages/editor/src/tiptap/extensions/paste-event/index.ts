import { Extension } from '@tiptap/core';
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
          handleDOMEvents: {
            paste: (_view, event) => {
              const editable = this.editor.isEditable;
              const { clipboardData } = event;
              if (!editable || !clipboardData || clipboardData.files.length === 0) {
                return false;
              }
              const text = clipboardData.getData('text/html');
              // <meta charset='utf-8'><img src="https://img0.baidu.com/it/u=1336187668,947788301&amp;fm=253&amp;fmt=auto&amp;app=138&amp;f=JPEG?w=500&amp;h=633"/>
              if (text) {
                // 如果是图片且图片地址是http的，直接跳过
                if (/<meta charset='utf-8'><img[^>]+src\s*=\s*['"]\s*https?:\/\/\s*[^'"]*/gi.test(text)) {
                  // 如果HTML中有网络图片，跳过默认粘贴处理
                  return false;
                }
              }
              event.preventDefault();
              const files = clipboardData.files;
              // @ts-ignore
              this.editor.emit('upload', files, event);
              return false;
            }
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
