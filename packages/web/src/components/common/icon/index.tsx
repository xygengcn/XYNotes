import { isString } from '@/utils';
import { defineComponent } from 'vue';
import './index.scss';

/**
 * 图标组件
 */
const Icon = defineComponent({
  name: 'Icon',
  props: {
    type: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default: 16
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    return () => (
      <i
        class={['iconfont', `note-${props.type}`]}
        style={{ fontSize: isString(props.size) ? props.size : props.size + 'px' }}
        onClick={(e) => {
          emit('click', e);
        }}
      />
    );
  }
});
export default Icon;
