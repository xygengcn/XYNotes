import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Ref } from 'vue-property-decorator';
import Dialog from '../dialog';
import Icon from '../icon';
import './index.scss';

interface IConfirmProps {
  // 类型
  type?: 'warn' | 'success' | 'error';
  // 主体
  content: string;
  // 标题
  title?: string;
  // 长度
  width?: number;
  // 高度
  height?: number;
  // 确认回调
  onSubmit?: (context: ConfirmComponent) => void;
  // 取消回调
  onCancel?: (context: ConfirmComponent) => void;
}

@Component
class ConfirmComponent extends VueComponent<IConfirmProps> {
  @Ref() private readonly context: Dialog;

  /**
   * 配置
   */
  private options: IConfirmProps = null;

  /**
   * 显示
   * @param options
   */
  public show(options: IConfirmProps) {
    this.options = options;
    this.context.show();
  }

  /**
   * 关闭
   */
  public close() {
    this.context.close();
  }

  /**
   * 确认
   */
  private handleSubmit() {
    if (this.options.onSubmit) {
      this.options.onSubmit?.(this);
    }
  }

  /**
   * 取消
   */
  private handleCancel() {
    if (this.options.onCancel) {
      this.options.onCancel?.(this);
    } else {
      this.close();
    }
  }
  public render(): VNode {
    return (
      <Dialog
        class="comfirm"
        ref="context"
        width={`${this.options?.width || 380}px`}
        height={`${this.options?.height || 150}px`}
      >
        <div class="confirm-header">
          {this.options?.type && <Icon type={`tip-${this.options.type}`} size={18} />}
          {this.options?.title || '提示'}
        </div>
        <div class="confirm-content">{this.options?.content}</div>
        <div class="confirm-footer">
          <button class="confirm-footer-submit" onclick={this.handleSubmit}>
            确认
          </button>
          <button class="confirm-footer-cancel" onclick={this.handleCancel}>
            取消
          </button>
        </div>
      </Dialog>
    );
  }
}

let instance: ConfirmComponent = null;
export default function Confirm(options: IConfirmProps): void {
  if (!instance) {
    instance = new ConfirmComponent();
    instance.$mount();
    document.body.appendChild(instance.$el);
  }
  instance.show(options);
}
