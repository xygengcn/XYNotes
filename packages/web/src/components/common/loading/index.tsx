import { defineComponent } from 'vue';
import Icon from '../icon';
import './index.scss';

const Loading = defineComponent({
  name: 'Loading',
  props: {
    text: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#409eff'
    }
  },
  setup(props) {
    return () => (
      <div class="loading">
        <span class="loading-icon">
          <Icon type="loading" style={{ color: props.color }} />
        </span>
        {props.text && <span class="loading-text">{props.text}</span>}
      </div>
    );
  }
});

export default Loading;
