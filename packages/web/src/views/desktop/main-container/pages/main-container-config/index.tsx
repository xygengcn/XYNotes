import RemoteConfigPage from '@/components/remote-config';
import { defineComponent } from 'vue';
import './index.scss';

const DesktopMainContainerConfig = defineComponent({
  name: 'DesktopMainContainerConfig',
  setup() {
    return () => (
      <div class="desktop-main-container-config" data-tauri-drag-region>
        <div class="desktop-main-container-config-container" data-tauri-drag-region>
          <RemoteConfigPage></RemoteConfigPage>
        </div>
      </div>
    );
  }
});

export default DesktopMainContainerConfig;
