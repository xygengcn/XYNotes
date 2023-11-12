import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import './index.scss';

interface IIconProps {
  type: string;
  size?: number | string;
  onclick?: (e: PointerEvent) => void;
}

@Component
export default class Icon extends VueComponent<IIconProps> {
  @Prop() private readonly type!: string;
  @Prop({ default: 16 }) private readonly size!: number | string;

  @Emit('click')
  private handleClick() {}

  /**
   * 大小
   */
  private get iconSize(): string {
    if (typeof this.size === 'number') {
      return `${this.size}px`;
    }
    return this.size;
  }
  public render(): VNode {
    return (
      <i class={['iconfont', `note-${this.type}`]} style={{ fontSize: this.iconSize }} onclick={this.handleClick}></i>
    );
  }
}
