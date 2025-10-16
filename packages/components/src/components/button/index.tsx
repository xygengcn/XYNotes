import { defineComponent, PropType } from 'vue';
import './index.scss';

/**
 * 按钮类型
 */
export type ButtonType = 'normal' | 'warn' | 'error' | 'default' | 'success';

/**
 * 按钮大小
 */
export type ButtonSize = 'min' | 'max' | 'default';
/**
 * 图标组件
 */
const Button = defineComponent({
  name: 'Button',
  props: {
    type: {
      type: String as PropType<ButtonType>,
      required: false,
      default: 'default'
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: 'default',
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    /**
     * 点击事件
     * @param e
     */
    const handleClick = (e: Event) => {
      if (props.disabled) return e.preventDefault();
      emit('click', e);
    };
    return () => (
      <button
        class={['button', `button-${props.type}`, `button-size-${props.size}`, props.disabled && 'button-disabled']}
        onClick={handleClick}
      >
        {slots.default?.()}
      </button>
    );
  }
});
export default Button;
