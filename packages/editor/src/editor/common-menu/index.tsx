import { NodeViewProps } from '@tiptap/core';
import { PluginKey } from '@tiptap/pm/state';
import { BubbleMenu } from '@tiptap/vue-3/menus';
import { Icon } from '@xynotes/components';
import { defineComponent, PropType } from 'vue';
import './index.scss';

export const EditorCommonMenu = defineComponent({
  name: 'EditorDaysMenu',
  props: {
    editor: {
      type: Object as PropType<NodeViewProps['editor']>,
      required: true
    }
  },
  setup(props) {
    const key = new PluginKey('editor-common-menu');
    const shouldShow = ({ editor }) => {
      return editor.isActive('days') || editor.isActive('image');
    };

    return () => (
      <BubbleMenu editor={props.editor} updateDelay={300} pluginKey={key} shouldShow={shouldShow}>
        <div class="editor-common-menu">
          <span
            onClick={() => {
              const editor = props.editor;
              const pos = editor.state.selection.to;
              editor.chain().insertContentAt(pos, { type: 'paragraph' }).focus().run();
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
      </BubbleMenu>
    );
  }
});
