import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Icon from '../common/icon';
import './index.scss';

interface IIconNavMenuProps {
  type: string;
  active?: boolean;
  width?: number;
  height?: number;
  size?: number;
}

@Component
export default class IconNavMenu extends VueComponent<IIconNavMenuProps> {
  @Prop() private readonly type!: string;
  @Prop({ default: false, type: Boolean }) private readonly active!: string;
  @Prop({ default: 36, type: Number }) private readonly width!: number;
  @Prop({ default: 36, type: Number }) private readonly height!: number;
  @Prop({ default: 16, type: Number }) private readonly size!: number;

  public render(): VNode {
    return (
      <span
        class={['icon-nav-menu', { active: this.active }]}
        style={{ width: `${this.width}px`, height: `${this.height}px` }}
      >
        <Icon type={this.type} size={this.size} />
      </span>
    );
  }
}
