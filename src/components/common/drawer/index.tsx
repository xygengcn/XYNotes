import { VNode } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import './index.scss';
import { VueComponent } from '@/shims-vue';

interface IDrawerProps {
  visible: boolean;
  position?: 'top' | 'bottom';
  onclose?: (e: PointerEvent) => void;
}
@Component({
  name: 'Drawer',
})
export default class Drawer extends VueComponent<IDrawerProps> {
  @Prop() private readonly visible: boolean;
  @Prop({ default: 'bottom' }) private readonly position: 'top' | 'bottom';

  @Emit('close')
  private handleClose() {}

  public render(): VNode {
    return (
      <div class={{ drawer: true, 'drawer-close': !this.visible }}>
        <div class="drawer-shadow" onclick={this.handleClose}></div>

        <div
          class={[
            'drawer-content',
            `drawer-content-${this.position}`,
            `drawer-content-${this.position}__${(this.visible && 'open') || 'close'}`,
          ]}
        >
          {this.$slots.default}
        </div>
      </div>
    );
  }
}
