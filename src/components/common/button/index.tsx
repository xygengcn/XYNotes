import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import './index.scss';

interface IButtonProps {
  type?: 'warn' | 'error' | 'default' | 'success';
  size?: 'min' | 'max' | 'default';
  onclick?: (e: PointerEvent) => void;
}

@Component
export default class Button extends VueComponent<IButtonProps> {
  @Prop({ default: 'default' }) private readonly type!: string;
  @Prop({ default: 'default' }) private readonly size!: string;

  @Emit('click')
  private handleClick() {}

  public render(): VNode {
    return (
      <button class={['button', `button-${this.type}`, `button-size-${this.size}`]} onclick={this.handleClick}>
        {this.$slots.default}
      </button>
    );
  }
}
