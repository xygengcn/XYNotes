import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import './index.scss';

interface IToastProps {
  text: string;
}

@Component
class ToastComponent extends VueComponent<IToastProps> {
  @Prop() private readonly text: string;
  public render(): VNode {
    return (
      <div class="toast">
        <div class="toast-text">{this.text}</div>
      </div>
    );
  }
}

function Toast(text: string): void {
  const instance = new ToastComponent({ propsData: { text } });
  instance.$mount();
  document.body.appendChild(instance.$el);
  setTimeout(() => {
    document.body.removeChild(instance.$el);
  }, 3000);
}

export default Toast;
