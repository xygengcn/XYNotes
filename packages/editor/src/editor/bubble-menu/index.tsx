import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu';
import { PluginKey } from '@tiptap/pm/state';
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { useEditor } from '..';
import './index.scss';
// import './heading/index.scss';
import { Icon } from '@xynotes/components';
import { useHeadingBubbleMenu } from './heading';

export const EditorBubbleMenu = defineComponent({
  name: 'EditorBubbleMenu',
  setup(props) {
    const root = ref<HTMLElement | null>(null);
    const key = new PluginKey('editor-menu');
    const { editor } = useEditor();

    // 菜单激活状态
    const bubbleMenuActiveNode = ref({
      bold: editor.value.isActive('bold'),
      italic: editor.value.isActive('italic'),
      strike: editor.value.isActive('strike'),
      codeBlock: editor.value.isActive('codeBlock'),
      heading: editor.value.isActive('heading'),
      headingLevel: editor.value.getAttributes('heading').level,
      highlight: editor.value.isActive('highlight')
    });

    // 标题
    const headingRef = ref(null);
    useHeadingBubbleMenu(headingRef);

    // 挂载
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
            bubbleMenuActiveNode.value.bold = editor.isActive('bold');
            bubbleMenuActiveNode.value.italic = editor.isActive('italic');
            bubbleMenuActiveNode.value.strike = editor.isActive('strike');
            bubbleMenuActiveNode.value.heading = editor.isActive('heading');
            bubbleMenuActiveNode.value.codeBlock = editor.isActive('codeBlock');
            bubbleMenuActiveNode.value.highlight = editor.isActive('highlight');
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
        <span class={{ active: bubbleMenuActiveNode.value.heading }} ref={headingRef}>
          <Icon type="heading"></Icon>
        </span>
        <span
          class={{ active: bubbleMenuActiveNode.value.bold }}
          onClick={() => {
            editor.value.chain().focus().toggleBold().run();
          }}
        >
          <Icon type="bold"></Icon>
        </span>
        <span
          class={{ active: bubbleMenuActiveNode.value.italic }}
          onClick={() => {
            editor.value.chain().focus().toggleItalic().run();
          }}
        >
          <Icon type="italic"></Icon>
        </span>
        <span
          class={{ active: bubbleMenuActiveNode.value.strike }}
          onClick={() => {
            editor.value.chain().focus().toggleStrike().run();
          }}
        >
          <Icon type="through" size="20px"></Icon>
        </span>
        <span
          class={{ active: bubbleMenuActiveNode.value.highlight }}
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
