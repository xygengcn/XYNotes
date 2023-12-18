import { defineComponent } from 'vue';
import Icon from '../icon';
import './index.scss';

const Loading = defineComponent({
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => (
      <div class="loading">
        <span class="loading-icon">
          <Icon type="loading" />
        </span>
        {props.text && <span class="loading-text">{props.text}</span>}
      </div>
    );
  },
});

export default Loading;
