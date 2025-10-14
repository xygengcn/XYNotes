import { Editor, findParentNode, posToDOMRect } from '@tiptap/core';
import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu';
import { PluginKey } from '@tiptap/pm/state';
import { Icon } from '@xynotes/components';
import { defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue';
import './index.scss';

export const EditorTableMenu = defineComponent({
  name: 'EditorTableMenu',
  props: {
    editor: {
      type: Object as PropType<Editor>
    }
  },
  setup(props) {
    const root = ref<HTMLElement | null>(null);
    const key = new PluginKey('editor-table-menu');
    // 挂载
    onMounted(() => {
      props.editor.registerPlugin(
        BubbleMenuPlugin({
          element: root.value as HTMLElement,
          pluginKey: key,
          editor: props.editor,
          tippyOptions: {
            hideOnClick: true,
            duration: 10,
            interactive: true,
            theme: 'light',
            placement: 'top-start',
            getReferenceClientRect: () => {
              const parentNode = findParentNode((node) => node.type.name === 'table')(props.editor.state.selection);
              if (parentNode) {
                const domRect = posToDOMRect(
                  props.editor.view,
                  parentNode.start,
                  parentNode.start + parentNode.node.nodeSize
                );
                return domRect;
              }
              return null;
            }
          },
          updateDelay: 300,
          shouldShow({ editor }) {
            return editor.isActive('table');
          }
        })
      );
    });
    onBeforeUnmount(() => {
      props.editor?.unregisterPlugin(key);
    });
    return () => (
      <div class="editor-table-menu" ref={root}>
        <span
          onClick={() => {
            props.editor.chain().focus().deleteTable().run();
          }}
        >
          <Icon type="trash" size={20}></Icon>
        </span>
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
      </div>
    );
  }
});
