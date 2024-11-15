import { IContextMenuProps } from '@/typings/contextmenu';
import { trim } from '@/utils';
import { readText } from '@/utils/clipboard';
import { PropType, defineComponent, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import Loading from '../../../web/src/components/common/loading';
import Scroller from '../../../web/src/components/common/scroller';
import './index.scss';
import { EditorController, VDITOR_CDN } from './lib';
export * from './lib';

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

    delay: {
      type: Number
    },
    id: {
      type: String
    },
    loading: {
      type: Boolean
    }
  },
  emits: {
    // 文本发生变化,延时
    change: (value: string) => true,
    // 失去焦点
    blur: (value: string) => true,
    // 开始创建
    created: (controller: EditorController) => true,
    // 挂在结束
    mounted: (controller: EditorController) => true,
    // 字数发生变化
    counter: (length: number) => true,
    // 更新
    updated: (controller: EditorController) => true,
    // 输入
    input: (e: InputEvent) => true,
    // 粘贴
    paste: (value: string) => true
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

    /**
     * 编辑器节点
     */
    const refEditorContent = ref<HTMLDivElement>();

    /**
     * 监听id
     */
    watch(
      () => props.id,
      () => {
        editorLoading.value = true;
        nextTick(() => {
          const selection = window.getSelection();
          selection.removeAllRanges();
        });
      }
    );

    /**
     * 监听值
     */
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
                context.emit('paste', editorController.getValue());
              }
            })
            .catch((e) => {
              console.log('[paste] error', e);
            });
          break;
        }
      }
    };

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
          onInput(e) {
            context.emit('input', e);
          },
          onChange: (value) => {
            console.log('[Editor] change');
            context.emit('change', value);
          },
          onCreated: (controler) => {
            console.log('[Editor] created');
            editorLoading.value = true;
            context.emit('created', controler);
          },
          onUpdated: (controler) => {
            editorLoading.value = false;
            context.emit('updated', controler);
          },
          onBlur: (value) => {
            editorLoading.value = false;
            context.emit('blur', value);
          },
          onMounted: (controler) => {
            console.log('[Editor] mounted');
            editorLoading.value = false;
            context.emit('mounted', controler);
          },
          onCounter: (count) => {
            console.log('[Editor] counter');
            context.emit('counter', count);
          }
        });
      }
    });
    onBeforeUnmount(() => {
      editorController?.destroy();
    });

    return {
      editorLoading,
      refEditorContent,
      // 右键事件
      onContextMenu,
      // 设置值
      setValue: (value: string) => {
        editorController.setValue(value);
      },
      // 设置值
      insertValue: (value: string) => {
        editorController.insertValue(value);
      }
    };
  },
  render() {
    return (
      <Scroller class={{ editor: true, 'editor-preview': this.type === 'preview' }} data-id={this.id} data-nodrag>
        <div
          ref="refEditorContent"
          class="editor-content"
          tabindex="1"
          v-contextmenu={{
            menuList: (this.type === 'editor' && [{ label: '仅粘贴文本', value: 'pasteText' }]) || [],
            onSelect: this.onContextMenu
          }}
          data-contextmenukey="Editor"
        ></div>
        {(this.editorLoading || this.loading) && (
          <div class="editor-loading">
            <Loading text="加载中" />
          </div>
        )}
      </Scroller>
    );
  }
});

export default Editor;
