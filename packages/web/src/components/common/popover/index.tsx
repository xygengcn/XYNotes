import { defineComponent, ref } from 'vue';
import './index.scss';

const Popover = defineComponent({
  setup(props, context) {
    const isShowPopover = ref(false);

    return () => (
      <div class="popover">
        {isShowPopover.value && <div class="popover-shadow" onClick={() => (isShowPopover.value = false)}></div>}
        <div class="popover-slot" onClick={() => (isShowPopover.value = true)}>
          {context.slots.default()}
        </div>
        {isShowPopover.value && (
          <div class="popover-content" onClick={() => (isShowPopover.value = false)}>
            {context.slots.popover()}
          </div>
        )}
      </div>
    );
  }
});

export default Popover;
