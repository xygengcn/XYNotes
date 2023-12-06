import { PropType } from 'vue';

import { defineComponent } from 'vue';
import './index.scss';
/**
 * 图标组件
 */
const Button = defineComponent({
  name: 'Button',
  props: {
    icon: {
      type: String as PropType<'warn' | 'error' | 'default' | 'success'>,
      required: false,
      default: 'default',
    },
    size: {
      type: String as PropType<'min' | 'max' | 'default'>,
      default: 'default',
      required: false,
    },
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    /**
     * 点击事件
     * @param e
     */
    const handleClick = (e: Event) => {
      emit('click', e);
    };
    return () => (
      <button class={['button', `button-${props.size}`, `button-size-${props.size}`]} onClick={handleClick}>
        {slots.default?.()}
      </button>
    );
  },
});
export default Button;
