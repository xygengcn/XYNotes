import { PropType, defineComponent, ref } from 'vue';
import './index.scss';

const Popover = defineComponent({
  props: {
    position: {
      type: String as PropType<'left' | 'right'>,
      default: 'right'
    }
  },
  setup(props, context) {
    const isShowPopover = ref(false);

    return () => (
      <div class="popover">
        {isShowPopover.value && <div class="popover-shadow" onClick={() => (isShowPopover.value = false)}></div>}
        <div class="popover-slot" onClick={() => (isShowPopover.value = true)}>
          {context.slots.default()}
        </div>
        {isShowPopover.value && (
          <div
            class={['popover-content', `popover-position-${props.position}`]}
            onClick={() => (isShowPopover.value = false)}
          >
            {context.slots.popover()}
          </div>
        )}
      </div>
    );
  }
});

export default Popover;
