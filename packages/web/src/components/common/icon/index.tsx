import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import './index.scss';

interface IIconProps {
  type: string;
  size?: number | string;
  draggable?: boolean;
  onclick?: (e: PointerEvent) => void;
}

@Component
export default class Icon extends VueComponent<IIconProps> {
  @Prop() private readonly type!: string;
  @Prop({ default: false }) private readonly draggable!: boolean;

  @Prop({ default: 16 }) private readonly size!: number | string;

  @Emit('click')
  private handleClick() {}

  /**
   * 大小
   */
  private get iconStyle() {
    if (typeof this.size === 'number') {
      return {
        fontSize: `${this.size}px`,
        width: `${this.size}px`,
        height: `${this.size}px`,
      };
    }
    return {
      fontSize: this.size,
      width: this.size,
      height: this.size,
    };
  }
  public render(): VNode {
    return (
      <i
        class={['iconfont', `note-${this.type}`]}
        style={this.iconStyle}
        onclick={this.handleClick}
        data-nodrag={!this.draggable}
      ></i>
    );
  }
}
