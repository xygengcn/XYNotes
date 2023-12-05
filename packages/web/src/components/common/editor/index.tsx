import { VNode } from 'vue';
import { Component, Prop, Ref, Watch } from 'vue-property-decorator';
import './index.scss';
import { VueComponent } from '@/shims-vue';
import { EditorController, VDITOR_CDN } from './lib';
import Loading from '../loading';

export * from './lib';

interface EditorProps {
  // 文本
  value?: string;
  // 编辑还预览
  type?: 'editor' | 'preview';
  // 延迟
  delay?: number;
  // 索引
  id?: string | number;

  // 文本发生变化,延时
  onChange?: (value: string) => void;
  // 开始创建
  onCreated?: (controller: EditorController) => void;
  // 挂在结束
  onMounted?: (controller: EditorController) => void;
  // 字数发生变化
  onCounter?: (length: number) => void;
}
@Component({
  name: 'Editor',
})
export default class Editor extends VueComponent<EditorProps> {
  // 值
  @Prop({ default: '' }) private readonly value!: string;

  // 值
  @Prop({ default: 0 }) private readonly id: string | number;

  // 类型
  @Prop({ default: 'editor' }) private readonly type: 'editor' | 'preview';

  // 节点
  @Ref('editorContent') public readonly editorContent: HTMLDivElement;

  /**
   * 编辑器控制器
   */
  public editorController!: EditorController;

  /**
   * 编辑器加载
   */
  private editorLoading = true;

  // 监听变化
  @Watch('value', { immediate: true })
  watchValuePreview() {
    // 预览
    this.$nextTick(() => {
      if (this.type === 'preview' && this.editorContent) {
        EditorController.preview(this.editorContent, this.value || '', {
          mode: 'dark',
          hljs: {
            style: 'native',
          },
          cdn: VDITOR_CDN,
          after: () => {
            this.editorLoading = false;
          },
        });
      }
    });
  }

  @Watch('id')
  watchId() {
    this.editorLoading = true;
    this.$nextTick(() => {
      this.editorController?.focus();
      const selection = window.getSelection();
      selection.removeAllRanges();
    });
  }

  public render(): VNode {
    return (
      <div class={{ editor: true, 'editor-preview': this.type === 'preview' }} data-id={this.id} data-nodrag>
        <div ref="editorContent" class="editor-content" tabindex="1"></div>
        {this.editorLoading && (
          <div class="editor-loading">
            <Loading text="加载中" />
          </div>
        )}
      </div>
    );
  }

  /**
   * 初始化一个编辑器
   */
  public mounted(): void {
    // 编辑
    if (this.type === 'editor') {
      this.editorController = new EditorController(this.editorContent, {
        width: '100%',
        preview: {
          maxWidth: 2048,
          hljs: {
            style: 'native',
          },
        },
        cache: {
          enable: false,
        },
        value: this.value,
        onChange: (value) => {
          this.$emit('change', value);
        },
        onCreated: (controler) => {
          this.editorLoading = true;
          this.$emit('created', controler);
        },
        onUpdated: (controler) => {
          this.editorLoading = false;
          this.$emit('updated', controler);
        },
        onMounted: (controler) => {
          this.editorLoading = false;
          this.$emit('mounted', controler);
        },
        onCounter: (count) => {
          this.$emit('counter', count);
        },
      });
    }
  }

  public beforeDestroy() {
    this.editorController?.destroy();
  }
}
