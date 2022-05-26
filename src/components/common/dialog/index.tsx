import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import './index.scss';

interface IDailogProps {
  width?: string;
  height?: string;
}

@Component
export default class Dialog extends VueComponent<IDailogProps> {
  @Prop({ default: '500px' }) private readonly width!: string;
  @Prop({ default: '500px' }) private readonly height!: string;

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
          <div class="dialog-shadow" onclick={this.close}></div>
          <transition name="zoom">
            <div class="dialog-content" style={{ width: this.width, height: this.height }}>
              {this.$slots.default}
            </div>
          </transition>
        </div>
      </transition>
    );
  }
}
