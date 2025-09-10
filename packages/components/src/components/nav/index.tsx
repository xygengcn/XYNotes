import { defineComponent } from 'vue';
import Icon from '../icon';
import './index.scss';

/**
 * 移动端导航栏
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
