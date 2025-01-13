import { defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue';
import './index.scss';
import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu';
import { PluginKey } from '@tiptap/pm/state';
import { useEditor } from '..';

export const EditorBubbleMenu = defineComponent({
  name: 'EditorBubbleMenu',
  setup(props) {
    const root = ref<HTMLElement | null>(null);
    const key = new PluginKey('editor-menu');
    const { editor } = useEditor();
    const isActiveNode = ref({
      bold: editor.value.isActive('bold'),
      italic:editor.value.isActive('italic'),
      strike:editor.value.isActive('strike'),
      codeBlock: editor.value.isActive('codeBlock')
    });
    onMounted(() => {
      editor.value.registerPlugin(
        BubbleMenuPlugin({
          element: root.value as HTMLElement,
          pluginKey: key,
          editor: editor.value,
          tippyOptions: { duration: 100 },
          updateDelay: 300,
          shouldShow({ from, to, editor }) {
            // 没有选区
            if (from === to) {
              return false;
            }
            // 代码块屏蔽
            if (editor.isActive('codeBlock')) {
              return false;
            }
            isActiveNode.value.bold = editor.isActive('bold');
            isActiveNode.value.italic = editor.isActive('italic');
            isActiveNode.value.strike = editor.isActive('strike');
            return true;
          }
        })
      );
    });
    onBeforeUnmount(() => {
      editor.value.unregisterPlugin(key);
    });
    return () => (
      <div class="editor-menu" ref={root}>
        <span
          class={{ active: isActiveNode.value.bold }}
          onClick={() => {
            editor.value.chain().focus().toggleBold().run();
          }}
        >
          Bold
        </span>
        <span
          class={{ active: isActiveNode.value.italic }}
          onClick={() => {
            editor.value.chain().focus().toggleItalic().run();
          }}
        >
          Italic
        </span>
        <span
          class={{ active: isActiveNode.value.strike }}
          onClick={() => {
            editor.value.chain().focus().toggleStrike().run();
          }}
        >
          Strike
        </span>
      </div>
    );
  }
});
