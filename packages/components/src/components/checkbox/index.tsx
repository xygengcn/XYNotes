import { defineComponent } from 'vue';
import './index.scss';
const Checkbox = defineComponent({
  name: 'Checkbox',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:value', 'change'],
  setup(props, context) {
    const onChange = (e) => {
      e.stopPropagation();
      context.emit('update:value', e.target.checked);
      context.emit('change', e.target.checked);
    };
    return () => <input type="checkbox" class="checkbox" checked={props.value} onInput={onChange} />;
  }
});
export default Checkbox;
