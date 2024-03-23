import AppView from '@/components/router-view';
import { defineComponent } from 'vue';
import './index.scss';

const Mobile = defineComponent({
  name: 'Mobile',
  setup() {
    return () => (
      <div class="mobile">
        <AppView />
      </div>
    );
  }
});

export default Mobile;
