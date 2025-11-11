import { defineComponent } from 'vue';
import './index.scss';

const Desktop = defineComponent({
  name: 'Desktop',
  setup() {
    return () => (
      <div class="desktop">
        <router-view></router-view>
      </div>
    );
  }
});

export default Desktop;
