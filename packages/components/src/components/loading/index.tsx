import { defineComponent } from 'vue';
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
      default: '#515151'
    }
  },
  setup(props) {
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
