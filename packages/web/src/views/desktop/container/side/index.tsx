import { defineComponent } from 'vue';
import './index.scss';

const DesktopSideContainer = defineComponent({
  name: 'DesktopSideContainer',
  props: {
    width: {
      type: Number,
      default: 250
    },
    maxWidth: {
      type: Number,
      default: 500
    },
    minWidth: {
      type: Number,
      default: 250
    }
  },
  setup(props) {
    return () => (
      <div
        class="desktop-side-container"
        style={{
          width: props.width + 'px',
          minWidth: props.minWidth + 'px',
          maxWidth: props.maxWidth + 'px'
        }}
      >
        <router-view name="side" />
      </div>
    );
  }
});

export default DesktopSideContainer;
