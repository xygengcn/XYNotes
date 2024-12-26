import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import { defineComponent } from 'vue';
import 'overlayscrollbars/overlayscrollbars.css';

const Scroller = defineComponent({
  name: 'Scroller',
  setup(_props, context) {
    return () => (
      <OverlayScrollbarsComponent element="div" options={{ scrollbars: { autoHide: 'leave', visibility: 'auto' } }}>
        {context.slots.default?.()}
      </OverlayScrollbarsComponent>
    );
  }
});

export default Scroller;
