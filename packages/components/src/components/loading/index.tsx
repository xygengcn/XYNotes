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
      type: String as PropType<'icon' | 'circle'>,
      default: 'icon' // icon | circle
    }
  },
  setup(props) {
    if (props.type === 'icon') {
      return () => (
        <div class="loading">
          <Icon type="loading"></Icon>
          <div class="loading-text" v-show={props.text}>
            <span>{props.text}</span>
          </div>
        </div>
      );
    }
    return () => (
      <div class="loading">
        <div class="loading-loader">
          <div class="circle" style={{ backgroundColor: props.color }}></div>
          <div class="circle" style={{ backgroundColor: props.color }}></div>
          <div class="circle" style={{ backgroundColor: props.color }}></div>
          <div class="circle" style={{ backgroundColor: props.color }}></div>
        </div>
        <div class="loading-text" v-show={props.text}>
          <span>{props.text}</span>
        </div>
      </div>
    );
  }
});

export default Loading;
