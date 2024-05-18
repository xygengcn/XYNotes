import { defineComponent } from 'vue';
import './index.scss';

/**
 * 开关组件
 */
const Switch = defineComponent({
  name: 'Switch',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const handleClick = () => {
      emit('change', !props.value);
    };
    return () => (
      <div class="switch" onClick={handleClick} data-value={props.value}>
        <span class="switch-box"></span>
      </div>
    );
  }
});
export default Switch;
