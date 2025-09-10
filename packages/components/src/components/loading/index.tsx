import { defineComponent, PropType } from 'vue';
import './index.scss';
import Icon from '../icon';

const Loading = defineComponent({
  name: 'Loading',
  props: {
    text: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#515151'
    },
    type: {
      type: String as PropType<'icon'>,
      default: 'icon' // icon
    }
  },
  setup(props) {
    return () => (
      <div class="loading">
        <Icon type="loading"></Icon>
        <div class="loading-text" v-show={props.text}>
          <span>{props.text}</span>
        </div>
      </div>
    );
  }
});

export default Loading;
