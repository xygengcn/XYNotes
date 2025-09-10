import RemoteConfigSetting from '@/components/remote-setting';
import { defineComponent } from 'vue';
import './index.scss';
import ShortcutkeysSetting from '@/components/shortcutkey-setting';
import { is } from '@xynotes/utils';

const DesktopMainContainerConfig = defineComponent({
  name: 'DesktopMainContainerConfig',
  setup() {
    return () => (
      <div class="desktop-main-container-config" data-tauri-drag-region>
        <div class="desktop-main-container-config-container">
          <RemoteConfigSetting></RemoteConfigSetting>
          <ShortcutkeysSetting v-show={is.app()}></ShortcutkeysSetting>
        </div>
      </div>
    );
  }
});

export default DesktopMainContainerConfig;
