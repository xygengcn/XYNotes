import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu';
import { Level } from '@tiptap/extension-heading';
import { PluginKey } from '@tiptap/pm/state';
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { useEditor } from '..';
import './index.scss';
import { Icon } from '@xynotes/components';

export const EditorBubbleMenu = defineComponent({
  name: 'EditorBubbleMenu',
  setup(props) {
    const root = ref<HTMLElement | null>(null);
    const key = new PluginKey('editor-menu');
    const { editor } = useEditor();
    const isActiveNode = ref({
      bold: editor.value.isActive('bold'),
      italic: editor.value.isActive('italic'),
      strike: editor.value.isActive('strike'),
      codeBlock: editor.value.isActive('codeBlock'),
      heading: editor.value.isActive('heading'),
      headingLevel: editor.value.getAttributes('heading').level,
      highlight: editor.value.isActive('highlight')
    });
    onMounted(() => {
      editor.value.registerPlugin(
        BubbleMenuPlugin({
          element: root.value as HTMLElement,
          pluginKey: key,
          editor: editor.value,
          tippyOptions: { duration: 100, theme: 'light' },
          updateDelay: 300,
          shouldShow({ from, to, editor }) {
            // 没有选区
            if (from === to) {
              return false;
            }
            // 代码块屏蔽
            if (editor.isActive('codeBlock') || editor.isActive('image')) {
              return false;
            }
            isActiveNode.value.bold = editor.isActive('bold');
            isActiveNode.value.italic = editor.isActive('italic');
            isActiveNode.value.strike = editor.isActive('strike');
            isActiveNode.value.heading = editor.isActive('heading');
            isActiveNode.value.headingLevel = editor.getAttributes('heading').level;
            isActiveNode.value.codeBlock = editor.isActive('codeBlock');
            isActiveNode.value.highlight = editor.isActive('highlight');
            return true;
          }
        })
      );
    });
    onBeforeUnmount(() => {
      editor.value?.unregisterPlugin(key);
    });
    return () => (
      <div class="editor-menu" ref={root}>
        {[1, 2, 3, 4, 5, 6].map((item: Level) => {
          return (
            <span
              class={{ heading: true, active: isActiveNode.value.heading && isActiveNode.value.headingLevel === item }}
              onClick={() => {
                editor.value.chain().focus().toggleHeading({ level: item }).run();
              }}
            >
              H{item}
            </span>
          );
        })}
        <span
          class={{ active: isActiveNode.value.bold }}
          onClick={() => {
            editor.value.chain().focus().toggleBold().run();
          }}
        >
          <Icon type="bold"></Icon>
        </span>
        <span
          class={{ active: isActiveNode.value.italic }}
          onClick={() => {
            editor.value.chain().focus().toggleItalic().run();
          }}
        >
          <Icon type="italic"></Icon>
        </span>
        <span
          class={{ active: isActiveNode.value.strike }}
          onClick={() => {
            editor.value.chain().focus().toggleStrike().run();
          }}
        >
          <Icon type="through"></Icon>
        </span>
        <span
          class={{ active: isActiveNode.value.highlight }}
          onClick={() => {
            editor.value.chain().focus().toggleHighlight().run();
          }}
        >
          <Icon type="highlight"></Icon>
        </span>
      </div>
    );
  }
});
