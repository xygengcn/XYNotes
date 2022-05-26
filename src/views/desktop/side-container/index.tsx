import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import './index.scss';
interface IDesktopSideContainerProps {
  width?: number;
  maxWidth?: number;
  minWidth?: number;
}

@Component
export default class DesktopSideContainer extends VueComponent<IDesktopSideContainerProps> {
  @Prop({ default: 250 }) private readonly width!: number;
  @Prop({ default: 500 }) private readonly maxWidth!: number;
  @Prop({ default: 250 }) private readonly minWidth!: number;
  public render(): VNode {
    return (
      <div
        class="desktop-side-container"
        style={{
          width: this.width + 'px',
          minWidth: this.minWidth + 'px',
          maxWidth: this.maxWidth + 'px',
        }}
      >
        <router-view name="side" />
      </div>
    );
  }
}
