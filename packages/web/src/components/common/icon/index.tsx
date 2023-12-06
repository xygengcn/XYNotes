import { defineComponent } from 'vue';
import './index.scss';
/**
 * 图标组件
 */
const Icon = defineComponent({
  name: 'Icon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 16,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    return () => (
      <i
        class={['iconfont', `note-${props.icon}`]}
        style={{ fontSize: props.size + 'px' }}
        onClick={(e) => {
          emit('click', e);
        }}
      />
    );
  },
});
export default Icon;
