import { VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import './index.scss';
import { VueComponent } from '@/shims-vue';
import EditorController from '@/services/editor';
import Loading from '../loading';

interface EditorProps {
  value?: string;
  onchange?: (value: string) => void;
  onCreated?: (controller: EditorController) => void;
  onMounted?: (controller: EditorController) => void; // 等after
}
@Component({
  name: 'Editor',
})
export default class Editor extends VueComponent<EditorProps> {
  @Prop() private value!: string;
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
        <div id="editorContent" class="editor-content"></div>
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
    this.editorController = new EditorController('editorContent', {
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

  // 销毁
  public destroyed(): void {
    this.editorController?.destroy();
  }
}
