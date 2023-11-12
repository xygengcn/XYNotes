import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import Icon from '../icon';
import './index.scss';

interface IDailogProps {
  customClass?: string;
  width?: string;
  height?: string;
  title?: string;
  onclose?: () => void;
  modal?: boolean; // 是否需要遮罩层
  closeOnClickModal?: boolean; // 是否可以通过点击 modal 关闭 Dialog
  customStyle?: Partial<CSSStyleDeclaration>;
}

@Component
export default class Dialog extends VueComponent<IDailogProps> {
  @Prop({ default: '500px' }) private readonly width!: string;
  @Prop({ default: '' }) private readonly customClass!: string;
  @Prop({ default: '' }) private readonly title!: string;
  @Prop({ default: '500px' }) private readonly height!: string;
  @Prop({ default: true }) private readonly modal!: boolean;
  @Prop({ default: true }) private readonly closeOnClickModal!: boolean;
  @Prop() private readonly customStyle!: Partial<CSSStyleDeclaration>;

  /**
   * 是否显示
   */
  private visible = false;

  /**
   * 显示
   */
  public show(): void {
    this.visible = true;
  }

  /**
   * 关闭
   */
  @Emit('close')
  public close(): void {
    this.visible = false;
  }

  public render(): VNode {
    return (
      <transition name="fade">
        <div class="dialog" style={{ display: this.visible ? 'block' : 'none' }}>
          {this.modal && (
            <div
              class="dialog-modal"
              onclick={() => {
                if (this.closeOnClickModal) {
                  this.close();
                }
              }}
            ></div>
          )}
          <transition name="zoom">
            <div class="dialog-wrap" style={{ width: this.width, height: this.height, ...(this.customStyle || {}) }}>
              {this.title && (
                <div class="dialog-header">
                  <h3>{this.title}</h3>
                  <Icon type="close" size={20} onclick={this.close}></Icon>
                </div>
              )}
              <div class={['dialog-content', this.customClass]}>{this.$slots.default}</div>
            </div>
          </transition>
        </div>
      </transition>
    );
  }
}
