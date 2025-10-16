import { Editor } from '@tiptap/core';
import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu';
import { PluginKey } from '@tiptap/pm/state';
import { Icon } from '@xynotes/components';
import { defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue';
import './index.scss';

export const EditorDaysMenu = defineComponent({
  name: 'EditorDaysMenu',
  props: {
    editor: {
      type: Object as PropType<Editor>
    }
  },
  setup(props) {
    const root = ref<HTMLElement | null>(null);
    const key = new PluginKey('editor-days-menu');
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
            placement: 'top-start'
          },
          updateDelay: 300,
          shouldShow({ editor }) {
            return editor.isActive('days');
          }
        })
      );
    });
    onBeforeUnmount(() => {
      props.editor?.unregisterPlugin(key);
    });
    return () => (
      <div class="editor-days-menu" ref={root}>
        <span
          onClick={() => {
            const editor = props.editor;
            editor
              .chain()
              .insertContentAt(props.editor.state.selection.from + 1, { type: 'paragraph' })
              .focus()
              .run();
          }}
        >
          <Icon type="paragraph" size={20}></Icon>
        </span>
        <span
          onClick={() => {
            props.editor.chain().deleteSelection().run();
          }}
        >
          <Icon type="trash" size={20}></Icon>
        </span>
      </div>
    );
  }
});
