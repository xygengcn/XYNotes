import { defineComponent } from 'vue';
import Icon from '../common/icon';
import './index.scss';

const IconNavMenu = defineComponent({
  props: {
    active: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 36
    },
    height: {
      type: Number,
      default: 36
    },
    size: {
      type: Number,
      default: 16
    }
  },
  emits: ['click'],
  setup(props, context) {
    /**
     * 点击事件
     * @param e
     */
    const handleClick = (e) => {
      context.emit('click', e);
    };
    return () => (
      <span
        class={['icon-nav-menu', { active: props.active }]}
        style={{ width: `${props.width}px`, height: `${props.height}px` }}
        onClick={handleClick}
      >
        <Icon type={props.type} size={props.size} />
      </span>
    );
  }
});

export default IconNavMenu;
