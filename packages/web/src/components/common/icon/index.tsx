import { isString } from '@/utils';
import { computed, defineComponent } from 'vue';
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
    const style = computed(() => {
      if (!isString(props.size)) {
        return {
          fontSize: props.size + 'px'
        };
      }
      return {
        fontSize: props.size
      };
    });
    return () => (
      <i
        class={['iconfont', `note-${props.type}`]}
        style={style.value}
        onClick={(e) => {
          emit('click', e);
        }}
      />
    );
  }
});
export default Icon;
