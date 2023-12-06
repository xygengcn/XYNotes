import { PropType, computed, createApp, defineComponent, ref } from 'vue';
import Dialog from '../dialog';
import Icon from '../icon';
import './index.scss';

interface IConfirmProps {
  // 类型
  type?: 'warn' | 'success' | 'error' | 'default';
  // 主体
  content: string;
  // 长度
  width?: number;
  // 高度
  height?: number;
  // 标题
  title?: string;
  // 确认回调
  onSubmit?: () => void;
  // 取消回调
  onCancel?: () => void;
}

const ConfirmComponent = defineComponent({
  name: 'Confirm',
  props: {
    icon: {
      type: String as PropType<'warn' | 'error' | 'default' | 'success'>,
      required: false,
      default: 'default'
    },
    size: {
      type: String as PropType<'min' | 'max' | 'default'>,
      default: 'default',
      required: false
    }
  },
  emits: ['close', 'submit', 'cancel'],
  setup(props, { emit }) {
    /**
     * 配置
     */
    const options = ref<IConfirmProps>({ type: 'default', width: 300, height: 150, content: '' });

    /**
     * 获取弹窗
     */
    const refContext = ref<typeof Dialog>(null);

    /**
     * 样式
     */
    const customStyle = computed(() => {
      const style = {};
      Object.assign(style, { height: `${options.value.height || 150}px`, width: `${options.value.width || 300}px` });
      return style;
    });

    /**
     * 关闭
     */
    const handleClose = () => {
      emit('close');
    };

    /**
     * 确认
     */
    const handleSubmit = () => {
      emit('submit');
    };

    /**
     * 取消
     */
    const handleCancel = () => {
      emit('cancel');
    };
    return () => (
      <Dialog customClass="confirm" ref={refContext} customStyle={customStyle.value} onClose={handleClose}>
        <div class="confirm-header">
          {options.value.type && <Icon type={`tip-${options.value.type}`} size={18} />}
          {options.value.title || '提示'}
        </div>
        <div class="confirm-content">{options.value.content}</div>
        <div class="confirm-footer">
          <button class="confirm-footer-submit" onClick={handleSubmit}>
            确认
          </button>
          <button class="confirm-footer-cancel" onClick={handleCancel}>
            取消
          </button>
        </div>
      </Dialog>
    );
  }
});

export default function Confirm(options: IConfirmProps): void {
  const instance = document.querySelector('#confirm');
  if (instance) {
    document.body.removeChild(instance);
  }
  const el = document.createElement('div');
  el.id = 'confirm';
  document.body.appendChild(el);
  const app = createApp(ConfirmComponent, {
    ...options,
    onClose() {
      app.unmount();
      el && document.body.removeChild(el);
    }
  });
  app.mount(el);
}
