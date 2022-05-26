import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import './index.scss';

interface IIconProps {
  type: string;
  size?: number | string;
}

@Component
export default class Icon extends VueComponent<IIconProps> {
  @Prop() private readonly type!: string;
  @Prop({ default: 16, type: Number || String }) private readonly size!: number;

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
    return <i class={['iconfont', `note-${this.type}`]} style={{ fontSize: this.iconSize }}></i>;
  }
}
