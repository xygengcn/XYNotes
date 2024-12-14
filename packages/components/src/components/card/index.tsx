import { defineComponent } from 'vue';
import './index.scss';

/**
 * 卡片组件
 */

const Card = defineComponent({
  name: 'Card',
  props: {
    borderRadius: {
      type: String,
      default: '8px'
    }
  },
  setup(props, context) {
    return () => (
      <div class="card" style={{ borderRadius: props.borderRadius }}>
        {context.slots.default?.()}
      </div>
    );
  }
});

export default Card;
