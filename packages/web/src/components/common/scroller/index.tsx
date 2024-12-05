import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import { defineComponent } from 'vue';

const Scroller = defineComponent({
  name: 'Scroller',
  setup(props, context) {
    return () => (
      <OverlayScrollbarsComponent element="div" options={{ scrollbars: { autoHide: 'leave', visibility: 'auto' } }}>
        {context.slots.default?.()}
      </OverlayScrollbarsComponent>
    );
  }
});

export default Scroller;
