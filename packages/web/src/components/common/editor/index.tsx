import { PropType, defineComponent, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import Loading from '../loading';
import './index.scss';
import { EditorController, VDITOR_CDN } from './lib';
export * from './lib';

const Editor = defineComponent({
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

    delay: {
      type: Number
    },

    id: {
      type: String
    }
  },
  emits: {
    // 文本发生变化,延时
    change: (value: string) => {},
    // 开始创建
    created: (controller: EditorController) => {},
    // 挂在结束
    mounted: (controller: EditorController) => {},
    // 字数发生变化
    counter: (length: number) => {},

    updated: (controller: EditorController) => {}
  },
  setup(props, context) {
    /**
     * 编辑器控制器
     */
    let editorController!: EditorController;

    /**
     * 编辑器加载
     */
    const editorLoading = ref<boolean>(true);

    const refEditorContent = ref<HTMLDivElement>();

    /**
     * 监听id
     */
    watch(
      () => props.id,
      () => {
        editorLoading.value = true;
        nextTick(() => {
          editorController?.focus();
          const selection = window.getSelection();
          selection.removeAllRanges();
        });
      }
    );

    watch(
      () => props.value,
      () => {
        // 预览
        nextTick(() => {
          if (props.type === 'preview' && refEditorContent.value) {
            EditorController.preview(refEditorContent.value, props.value || '', {
              mode: 'dark',
              hljs: {
                style: 'native'
              },
              cdn: VDITOR_CDN,
              after: () => {
                editorLoading.value = false;
              }
            });
          }
        });
      },
      { immediate: true }
    );

    onBeforeUnmount(() => {
      editorController.destroy();
    });

    onMounted(() => {
      // 编辑
      if (props.type === 'editor') {
        editorController = new EditorController(refEditorContent.value, {
          width: '100%',
          preview: {
            maxWidth: 2048,
            hljs: {
              style: 'native'
            }
          },
          cache: {
            enable: false
          },
          value: props.value,
          onChange: (value) => {
            context.emit('change', value);
          },
          onCreated: (controler) => {
            editorLoading.value = true;
            context.emit('created', controler);
          },
          onUpdated: (controler) => {
            editorLoading.value = false;
            context.emit('updated', controler);
          },
          onMounted: (controler) => {
            editorLoading.value = false;
            context.emit('mounted', controler);
          },
          onCounter: (count) => {
            context.emit('counter', count);
          }
        });
      }
    });
    return {
      editorLoading,
      refEditorContent
    };
  },
  render() {
    return (
      <div class={{ editor: true, 'editor-preview': this.type === 'preview' }} data-id={this.id} data-nodrag>
        <div ref="refEditorContent" class="editor-content" tabindex="1"></div>
        {this.editorLoading && (
          <div class="editor-loading">
            <Loading text="加载中" />
          </div>
        )}
      </div>
    );
  }
});

export default Editor;
