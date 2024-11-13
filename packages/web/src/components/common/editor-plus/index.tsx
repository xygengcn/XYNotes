import { useScroll } from '@/services/hook';
import { IContextMenuProps } from '@/typings/contextmenu';
import { trim } from '@/utils';
import { readText } from '@/utils/clipboard';
import { Editor as EditorController, MarkdownEditor } from '@xynotes/editor';
import '@xynotes/editor/dist/style.css';
import { PropType, defineComponent, nextTick, ref, shallowRef, watch } from 'vue';
import Loading from '../loading';
import './index.scss';

const Editor = defineComponent({
  name: 'Editor',
  props: {
    value: {
      type: String,
      required: true,
      default: ''
    },
    // 编辑还预览
    type: {
      type: String as PropType<'editor' | 'preview'>,
      default: 'editor'
    },
    id: {
      type: String
    },
    loading: {
      type: Boolean
    },
    // 是否开启计数
    counter: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    // 文本发生变化,延时
    change: (value: string) => true,
    // 失去焦点
    blur: (value: string) => true,
    // 开始创建
    created: (controller: EditorController) => true,
    // 字数发生变化
    counter: (length: number) => true,
    // 粘贴
    paste: (value: string) => true,
    // 上传
    upload: (files: FileList, event: Event, editor: EditorController) => editor
  },
  setup(props, context) {
    /**
     * 编辑器加载
     */
    const editorLoading = ref<boolean>(true);

    /**
     * 编辑器
     */
    const refEditor = shallowRef<HTMLDivElement>();

    /**
     * 编辑器内容节点
     */
    const refEditorContent = shallowRef<typeof MarkdownEditor>();

    /**
     * 滚动数据
     */
    const { scrollerState } = useScroll(refEditorContent as any);

    /**
     * 监听id
     */
    watch(
      () => props.id,
      () => {
        nextTick(() => {
          const selection = window.getSelection();
          selection.removeAllRanges();
        });
      }
    );

    const onContextMenu = async (options: IContextMenuProps) => {
      switch (options.menu.value) {
        case 'pasteText': {
          readText()
            .then((text) => {
              console.log('[paste]', text);
              text = trim(text);
              if (text) {
                const selection = window.getSelection();
                // 获取旧选区
                let range = options.range;
                if (range) {
                  selection.addRange(options.range);
                  range.deleteContents();
                } else {
                  // 创建新选区
                  range = document.createRange();
                }
                range.insertNode(document.createTextNode(text));
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
                context.emit('paste', refEditorContent.value.getContent());
              }
            })
            .catch((e) => {
              console.log('[paste] error', e);
            });
          break;
        }
      }
    };

    const onChange = () => {
      console.log('[Editor] change');
      context.emit('change', refEditorContent.value.getContent());
    };

    const onCreated = (controler) => {
      console.log('[Editor] created');
      editorLoading.value = false;
      context.emit('created', controler);
    };
    const onBlur = () => {
      editorLoading.value = false;
      context.emit('blur', refEditorContent.value.getContent());
    };
    const onCounter = ({ characters }) => {
      console.log('[Editor] counter', characters);
      context.emit('counter', characters);
    };

    /**
     * 获取编辑器内容元素的引用。
     *
     * 该函数返回一个对编辑器内容区域元素的引用。这允许外部代码直接操作或访问这个元素，
     * 例如，获取它的尺寸、位置或者应用样式变化。
     *
     * @returns {HTMLElement} 返回一个HTMLElement对象，代表编辑器内容区域的根元素。
     */
    const getContentElement = () => {
      // 通过ref获取编辑器内容区域的DOM元素，并返回它。
      if (refEditor.value) {
        // 寻找data-overlayscrollbars-contents为true的子节点
        return refEditor.value.querySelector('[contenteditable="false"]') as HTMLElement;
      }
    };

    return {
      refEditor,
      editorLoading,
      refEditorContent,
      scrollerState,
      onCounter,
      onCreated,
      onBlur,
      onChange,
      getContentElement,
      // 右键事件
      onContextMenu,
      // 设置值
      setValue: (value: string) => {
        refEditorContent.value.setContent(value);
      },
      // 设置值
      insertValue: (value: string) => {
        refEditorContent.value.insertContent(value);
      }
    };
  },
  render() {
    return (
      <div
        class={{ editor: true, 'editor-preview': this.type === 'preview' }}
        data-id={this.id}
        data-nodrag
        ref="refEditor"
      >
        <MarkdownEditor
          class="editor-content"
          modelValue={this.value}
          ref="refEditorContent"
          onChange={this.onChange}
          onCounter={this.onCounter}
          onCreated={this.onCreated}
          onBlur={this.onBlur}
          onUpload={this.$emit.bind(this, 'upload')}
          counter={this.counter}
          editable={this.type === 'editor'}
        />
        {(this.editorLoading || this.loading) && (
          <div class="editor-loading">
            <Loading text="加载中" />
          </div>
        )}
      </div>
    );
  }
});

export default Editor;
