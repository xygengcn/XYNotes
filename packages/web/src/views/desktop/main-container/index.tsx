import { defineComponent } from 'vue';
import './index.scss';

const DesktopMainContainer = defineComponent({
  name: 'DesktopMainContainer',
  setup() {
    return () => (
      <div class="desktop-main-container">
        <router-view name="main" />
      </div>
    );
  }
});

export default DesktopMainContainer;
