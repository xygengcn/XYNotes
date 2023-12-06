import { defineComponent, onBeforeUnmount } from 'vue';
import './index.scss';

const Input = defineComponent({
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    /**
     * 输入计时器
     */
    let inputTimeOut: number | null = null;

    /**
     * 输入
     * @param e
     */
    const handleInput = (e: Event) => {
      context.emit('input', (e.target as HTMLInputElement).value);
      handleChange(e);
    };
    /**
     * 失去焦点
     * @param e
     */
    const handleBlur = (e: Event) => {
      inputTimeOut && clearTimeout(inputTimeOut);
      context.emit('blur', e);
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
        context.emit('change', (e.target as HTMLInputElement).value);
        inputTimeOut && clearTimeout(inputTimeOut);
      }, 500);
    };

    onBeforeUnmount(() => {
      inputTimeOut && clearTimeout(inputTimeOut);
    });

    return () => (
      <div class="input" data-nodrag>
        <div class="input-content">
          <input
            class="input-content-inner"
            type="text"
            value={props.value}
            onInput={handleInput}
            onBlur={handleBlur}
          />
        </div>
      </div>
    );
  },
});

export default Input;
