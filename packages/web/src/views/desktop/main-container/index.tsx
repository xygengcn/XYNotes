import { defineComponent } from 'vue';
import './index.scss';

const DesktopMainContainer = defineComponent({
  setup() {
    return () => (
      <div class="desktop-main-container">
        <router-view name="main" />
      </div>
    );
  }
});

export default DesktopMainContainer;
