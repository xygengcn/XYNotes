import { defineMarkdownEditor } from '@/tiptap';
import { Loading } from '@xynotes/components';
import { defineComponent, nextTick, ref, watch } from 'vue';
import './index.scss';

const useEditor = defineMarkdownEditor();

const Editor = defineComponent({
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
    const { loading } = useEditor({ defaultValue: props.value });
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
      <div class="editor" data-id={props.id} data-nodrag>
        <div class="editor-content" ref="editor" />
        {(props.loading || loading.value) && (
          <div class="editor-loading">
            <Loading text="加载中"/>
          </div>
        )}
      </div>
    );
  }
});

export { Editor, useEditor };
