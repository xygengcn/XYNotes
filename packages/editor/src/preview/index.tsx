import { defineMarkdownEditorPreview } from '@editor/tiptap';
import { Loading } from '@xynotes/components';
import { defineComponent } from 'vue';
import './index.scss';

const useEditorPreview = defineMarkdownEditorPreview();

const EditorPerview = defineComponent({
  name: 'EditorPerview',
  props: {
    value: {
      type: String,
      required: true,
      default: ''
    }
  },
  setup(props) {
    // 初始化编辑器
    const { loading } = useEditorPreview({ defaultValue: props.value });

    return () => (
      <div class="editor-preview" data-nodrag>
        <div class="editor-preview-content" ref="editor" />
        {loading.value && (
          <div class="editor-preview-loading">
            <Loading text="加载中" />
          </div>
        )}
      </div>
    );
  }
});

export { EditorPerview, useEditorPreview };
