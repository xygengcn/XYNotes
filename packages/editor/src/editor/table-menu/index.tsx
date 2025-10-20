import { findParentNode, NodeViewProps } from '@tiptap/core';
import { PluginKey } from '@tiptap/pm/state';
import { BubbleMenu } from '@tiptap/vue-3/menus';
import { Icon } from '@xynotes/components';
import { defineComponent, PropType } from 'vue';
import './index.scss';

export const EditorTableMenu = defineComponent({
  name: 'EditorTableMenu',
  props: {
    editor: {
      type: Object as PropType<NodeViewProps['editor']>,
      required: true
    }
  },
  setup(props) {
    const key = new PluginKey('editor-table-menu');
    const shouldShow = ({ editor }) => {
      return editor.isActive('table');
    };
    return () => (
      <BubbleMenu editor={props.editor} updateDelay={300} pluginKey={key} shouldShow={shouldShow}>
        <div class="editor-table-menu">
          <span
            onClick={() => {
              props.editor.chain().focus().addRowBefore().run();
            }}
          >
            <Icon type="table-row-before" size={20}></Icon>
          </span>
          <span
            onClick={() => {
              props.editor.chain().focus().addRowAfter().run();
            }}
          >
            <Icon type="table-row-after" size={20}></Icon>
          </span>
          <span
            onClick={() => {
              props.editor.chain().focus().deleteRow().run();
            }}
          >
            <Icon type="table-row-del" size={20}></Icon>
          </span>

          <span
            onClick={() => {
              props.editor.chain().focus().addColumnBefore().run();
            }}
          >
            <Icon type="table-col-before" size={20}></Icon>
          </span>
          <span
            onClick={() => {
              props.editor.chain().focus().addColumnAfter().run();
            }}
          >
            <Icon type="table-col-after" size={20}></Icon>
          </span>
          <span
            onClick={() => {
              props.editor.chain().focus().deleteColumn().run();
            }}
          >
            <Icon type="table-col-del" size={20}></Icon>
          </span>
          <span
            onClick={() => {
              const editor = props.editor;
              const parentNode = findParentNode((node) => node.type.name === 'table')(props.editor.state.selection);
              editor
                .chain()
                .insertContentAt(parentNode.node.nodeSize + parentNode.start - 1, { type: 'paragraph' })
                .focus()
                .run();
            }}
          >
            <Icon type="table-break" size={20}></Icon>
          </span>
          <span
            onClick={() => {
              props.editor.chain().focus().deleteTable().run();
            }}
          >
            <Icon type="trash" size={20}></Icon>
          </span>
        </div>
      </BubbleMenu>
    );
  }
});
