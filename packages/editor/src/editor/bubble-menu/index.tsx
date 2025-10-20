import { isTextSelection, NodeViewProps } from '@tiptap/core';
import { PluginKey } from '@tiptap/pm/state';
import { BubbleMenu } from '@tiptap/vue-3/menus';
import { Icon, Toast } from '@xynotes/components';
import { copyText, readText } from '@xynotes/utils';
import { defineComponent, PropType, ref } from 'vue';
import { useEditor } from '..';
import { useBubbleMenuColor } from './color';
import { useBubbleMenuHeading } from './heading';
import './index.scss';

export const EditorBubbleMenu = defineComponent({
  name: 'EditorBubbleMenu',
  props: {
    editor: {
      type: Object as PropType<NodeViewProps['editor']>,
      required: true
    }
  },
  setup(props) {
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

    const shouldShow = ({ editor, state, from, to }) => {
      const { doc, selection } = state;
      const { empty } = selection;
      // Sometime check for `empty` is not enough.
      // Doubleclick an empty paragraph returns a node size of 2.
      // So we check also for an empty text size.
      const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(state.selection);
      if (isEmptyTextBlock || empty) {
        return false;
      }

      // 代码块屏蔽
      if (
        editor.isActive('codeBlock') ||
        editor.isActive('image') ||
        editor.isActive('table') ||
        editor.isActive('days')
      ) {
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
    };
    return () => (
      <BubbleMenu editor={props.editor} updateDelay={300} pluginKey={key} shouldShow={shouldShow}>
        <div class="editor-menu">
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
      </BubbleMenu>
    );
  }
});
