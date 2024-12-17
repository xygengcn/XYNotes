import { defineComponent, onBeforeUnmount } from 'vue';
import './index.scss';

const Input = defineComponent({
  name: 'Input',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    change: (_value: string) => true,
    input: (_value: string) => true,
    'update:value': (_value: string) => true,
    blur: (_e: Event, _value: string) => true
  },
  setup(props, context) {
    /**
     * 输入计时器
     */
    let inputTimeOut: number | null = null;

    /**
     * 原始数据
     */
    let orignalValue = props.value;

    /**
     * 输入
     * @param e
     */
    const handleInput = (e: Event) => {
      context.emit('input', (e.target as HTMLInputElement).value);
      if (orignalValue !== (e.target as HTMLInputElement).value) {
        context.emit('update:value', (e.target as HTMLInputElement).value);
      }
      handleChange(e);
    };
    /**
     * 失去焦点
     * @param e
     */
    const handleBlur = (e: Event) => {
      inputTimeOut && clearTimeout(inputTimeOut);
      context.emit('blur', e, orignalValue);
      orignalValue = (e.target as HTMLInputElement).value;
    };

    /**
     * 500ms延迟
     *
     * @param e
     */
    const handleChange = (e: Event) => {
      if (inputTimeOut) {
        clearTimeout(inputTimeOut);
      }
      inputTimeOut = window.setTimeout(() => {
        if (orignalValue !== (e.target as HTMLInputElement).value) {
          context.emit('change', (e.target as HTMLInputElement).value);
        }
        inputTimeOut && clearTimeout(inputTimeOut);
      }, 500);
    };

    onBeforeUnmount(() => {
      inputTimeOut && clearTimeout(inputTimeOut);
    });

    return () => (
      <div class={{ input: true, 'input-border': props.border }} data-nodrag>
        <div class="input-content">
          <input
            class="input-content-inner"
            type="text"
            value={props.value}
            onInput={handleInput}
            onBlur={handleBlur}
            placeholder={props.placeholder}
          />
        </div>
      </div>
    );
  }
});

export default Input;