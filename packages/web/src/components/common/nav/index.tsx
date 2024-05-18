import { defineComponent } from 'vue';
import './index.scss';
import Icon from '../icon';

/**
 * 导航栏
 */

const Nav = defineComponent({
  name: 'Nav',
  props: {
    title: {
      type: String,
      default: ''
    },
    backText: {
      type: String,
      default: ''
    }
  },
  emits: ['back'],
  setup(props, context) {
    const handleBack = () => {
      context.emit('back');
    };
    return () => (
      <div class="nav">
        <span class="nav-back" onClick={handleBack}>
          <Icon type="back"></Icon>
          <span>{props.backText}</span>
        </span>
        <span class="nav-title">{props.title}</span>
        <span></span>
      </div>
    );
  }
});

export default Nav;
