import { VNode } from 'vue';
import { Component, Emit, Prop, Ref, Watch } from 'vue-property-decorator';
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

  @Ref() private readonly content: HTMLDivElement;

  @Emit('close')
  private handleClose() {}

  @Watch('visible')
  watchVisible() {
    if (this.visible) {
      this.content.classList.remove(`drawer-content-${this.position}__close`);
      this.content.classList.add(`drawer-content-${this.position}__open`);
    } else {
      this.content.classList.remove(`drawer-content-${this.position}__open`);
      this.content.classList.add(`drawer-content-${this.position}__close`);
    }
  }

  public render(): VNode {
    return (
      <div class={{ drawer: true, 'drawer-close': !this.visible }}>
        <div class="drawer-shadow" onclick={this.handleClose}></div>
        <div ref="content" class={['drawer-content', `drawer-content-${this.position}`]}>
          {this.$slots.default}
        </div>
      </div>
    );
  }
}
