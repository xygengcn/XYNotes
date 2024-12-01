import { PropType, computed, createApp, defineComponent, ref } from 'vue';
import Button, { ButtonSize, ButtonType } from '../button';
import Dialog from '../dialog';
import Icon from '@xynotes/components/src/icon';
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

  // 按钮数组
  buttons?: Array<{ text: string; type: ButtonType; onClick: () => void; size: ButtonSize }>;
}

const ConfirmComponent = defineComponent({
  name: 'Confirm',
  props: {
    type: {
      type: String as PropType<'warn' | 'error' | 'success'>,
      required: false,
      default: ''
    },
    content: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 150
    },
    buttons: {
      type: Array as PropType<Array<{ text: string; type: ButtonType; onClick: () => Boolean; size: ButtonSize }>>,
      default: []
    }
  },
  emits: ['close', 'submit', 'cancel'],
  setup(props, { emit }) {
    /**
     * 获取弹窗
     */
    const refContext = ref<typeof Dialog>(null);

    /**
     * 样式
     */
    const customStyle = computed(() => {
      const style = {};
      Object.assign(style, {
        minHeight: `${props.height || 150}px`,
        height: 'max-content',
        width: `${props.width || 300}px`
      });
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
      handleClose();
    };

    /**
     * 取消
     */
    const handleCancel = () => {
      emit('cancel');
      handleClose();
    };

    return () => (
      <Dialog customClass="confirm" ref={refContext} customStyle={customStyle.value} onClose={handleClose}>
        <div class="confirm-header">
          <Icon type={`tip-${props.type}`} size={18} v-show={props.type} />
          <span>{props.title || '提示'}</span>
        </div>
        <div class="confirm-content">{props.content}</div>

        <div class="confirm-footer">
          {props.buttons?.length > 0
            ? props.buttons.map((item) => {
                return (
                  <Button
                    class="confirm-footer-submit"
                    icon={item.type || 'default'}
                    size={item.size || 'min'}
                    onClick={async () => {
                      const result = await item.onClick();
                      result && handleClose();
                    }}
                  >
                    {item.text}
                  </Button>
                );
              })
            : [
                <Button class="confirm-footer-submit" size="min" onClick={handleSubmit}>
                  确认
                </Button>,
                <Button class="confirm-footer-cancel" icon="normal" size="min" onClick={handleCancel}>
                  取消
                </Button>
              ]}
        </div>
      </Dialog>
    );
  }
});

export default function Confirm(options: IConfirmProps): void {
  console.log('[Confirm]', options);
  const instance = document.querySelector('#confirm');
  if (instance) {
    document.body.removeChild(instance);
  }
  const el = document.createElement('div');
  el.id = 'confirm';
  document.body.appendChild(el);
  const app = createApp(ConfirmComponent, {
    ...options,
    onSubmit() {
      options.onSubmit?.();
    },
    onCancel() {
      options.onCancel?.();
    },
    onClose() {
      app.unmount();
      el && document.body.removeChild(el);
    }
  });
  app.mount(el);
}
