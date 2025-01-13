import { defineMarkdownEditor } from "@editor/tiptap";
import { Loading } from '@xynotes/components';
import { defineComponent, nextTick, watch } from 'vue';
import { EditorBubbleMenu } from './bubble-menu';
import './index.scss';

export const useEditor = defineMarkdownEditor();

export const Editor = defineComponent({
  name: 'Editor',
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      required: true,
      default: ''
    },
    loading: {
      type: Boolean
    }
  },
  setup(props) {
    // 初始化编辑器
    const { loading, editor } = useEditor({ defaultValue: props.value });
    /**
     * 监听id
     */
    watch(
      () => props.id,
      () => {
        nextTick(() => {
          const selection = window.getSelection();
          selection?.removeAllRanges();
        });
      }
    );

    return () => (
      <div class={{ editor: true, test: editor.value?.isActive('bold') }} data-id={props.id} data-nodrag>
        <div class="editor-content" ref="editor" />
        {editor.value && <EditorBubbleMenu editor={editor.value} />}
        {(props.loading || loading.value) && (
          <div class="editor-loading">
            <Loading text="加载中" />
          </div>
        )}
      </div>
    );
  }
});
