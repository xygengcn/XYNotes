import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu';
import { PluginKey } from '@tiptap/pm/state';
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { useEditor } from '..';
import './index.scss';
// import './heading/index.scss';
import { Icon, Toast } from '@xynotes/components';
import { copyText, readText } from '@xynotes/utils';
import { useBubbleMenuColor } from './color';
import { useBubbleMenuHeading } from './heading';

export const EditorBubbleMenu = defineComponent({
  name: 'EditorBubbleMenu',
  setup(props) {
    const root = ref<HTMLElement | null>(null);
    const key = new PluginKey('editor-menu');
    const { editor, getSelectedText, insertContent } = useEditor();

    // 菜单激活状态
    const bubbleMenuActiveNode = ref({
      bold: editor.value.isActive('bold'),
      italic: editor.value.isActive('italic'),
      strike: editor.value.isActive('strike'),
      codeBlock: editor.value.isActive('codeBlock'),
      heading: editor.value.isActive('heading'),
      headingLevel: editor.value.getAttributes('heading').level,
      highlight: editor.value.isActive('highlight'),
      task: editor.value.isActive('taskList'),
      color: !!editor.value.getAttributes('textStyle')?.color
    });

    // 标题
    const headingRef = ref(null);
    useBubbleMenuHeading(headingRef);

    const colorRef = ref(null);
    useBubbleMenuColor(colorRef);

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
            bubbleMenuActiveNode.value.task = editor.isActive('taskList');
            bubbleMenuActiveNode.value.color = !!editor.getAttributes('textStyle')?.color;
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
          <Icon type="through" size="19px"></Icon>
        </span>
        <span
          class={{ active: bubbleMenuActiveNode.value.highlight }}
          onClick={() => {
            editor.value.chain().focus().toggleHighlight().run();
          }}
        >
          <Icon type="highlight"></Icon>
        </span>

        <span ref={colorRef} class={{ active: bubbleMenuActiveNode.value.color }}>
          <Icon type="fontColor"></Icon>
        </span>
        <span
          class={{ active: bubbleMenuActiveNode.value.task }}
          onClick={() => {
            editor.value.chain().focus().toggleTaskList().run();
          }}
        >
          <Icon type="todo"></Icon>
        </span>
        <span
          onClick={() => {
            // 复制选中的文本
            const text = getSelectedText() || '';
            copyText(text);
            Toast('复制成功');
          }}
        >
          <Icon type="copy"></Icon>
        </span>
        <span
          onClick={async () => {
            const text = await readText();
            if (text) {
              insertContent(text);
            }
          }}
        >
          <Icon type="paste"></Icon>
        </span>
      </div>
    );
  }
});
