import { VNode } from 'vue';
import { Component, Prop, Ref, Watch } from 'vue-property-decorator';
import './index.scss';
import { VueComponent } from '@/shims-vue';
import { EditorController } from './lib';
import Loading from '../loading';

export * from './lib';

interface EditorProps {
  value?: string;
  type?: 'editor' | 'preview';
  onchange?: (value: string) => void;
  onCreated?: (controller: EditorController) => void;
  onMounted?: (controller: EditorController) => void; // 等after
}
@Component({
  name: 'Editor',
})
export default class Editor extends VueComponent<EditorProps> {
  // 值
  @Prop({ default: '' }) private readonly value!: string;

  // 类型
  @Prop({ default: 'editor' }) private readonly type: 'editor' | 'preview';

  // 节点
  @Ref('editorContent') public readonly editorContent: HTMLDivElement;

  // 监听变化
  @Watch('value', { immediate: true })
  watchValuePreview() {
    // 预览
    if (this.type === 'preview') {
      EditorController.preview(this.editorContent, this.value || '', {
        mode: 'dark',
        hljs: {
          style: 'native',
        },
        after: () => {
          this.editorLoading = false;
        },
      });
    }
  }

  /**
   * 编辑器控制器
   */
  public editorController!: EditorController;

  /**
   * 编辑器加载
   */
  private editorLoading = true;

  public render(): VNode {
    return (
      <div class="editor">
        <div ref="editorContent" class="editor-content"></div>
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
        toolbarConfig: {
          disable: true,
        },
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
          this.$emit('Created', controler);
        },
        onMounted: (controler) => {
          this.editorLoading = false;
          this.$emit('Mounted', controler);
        },
      });
    }
  }

  // 销毁
  public destroyed(): void {
    this.editorController?.destroy();
  }
}
