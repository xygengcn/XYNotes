import { createApp, defineComponent } from 'vue';
import './index.scss';

const ToastComponent = defineComponent({
  name: 'Toast',
  props: {
    text: String
  },
  setup(props) {
    return () => (
      <div class="toast">
        <div class="toast-text">{props.text}</div>
      </div>
    );
  }
});

function Toast(text: string): void {
  const el = document.createElement('div');
  document.body.appendChild(el);
  const app = createApp(ToastComponent, {
    text
  });
  app.mount(el);
  setTimeout(() => {
    app.unmount();
    document.body.removeChild(el);
  }, 3000);
}

export default Toast;
