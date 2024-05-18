import RemoteConfigPage from '@/components/remote-config';
import { defineComponent } from 'vue';
import './index.scss';

const DesktopMainContainerConfig = defineComponent({
  name: 'DesktopMainContainerConfig',
  setup() {
    return () => (
      <div class="desktop-main-container-config">
        <div class="desktop-main-container-config-container">
          <RemoteConfigPage></RemoteConfigPage>
        </div>
      </div>
    );
  }
});

export default DesktopMainContainerConfig;
