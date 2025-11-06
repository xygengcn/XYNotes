import RemoteConfigSetting from '@/components/remote-setting';
import ShortcutkeysSetting from '@/components/shortcutkey-setting';
import { is } from '@xynotes/utils';
import { defineComponent } from 'vue';
import './index.scss';

const DesktopMainContainerSetting = defineComponent({
  name: 'DesktopMainContainerSetting',
  setup() {
    return () => (
      <div class="desktop-main-container-setting" data-tauri-drag-region>
        <div class="desktop-main-container-setting-container">
          <RemoteConfigSetting></RemoteConfigSetting>
          <ShortcutkeysSetting v-show={is.app()}></ShortcutkeysSetting>
        </div>
      </div>
    );
  }
});

export default DesktopMainContainerSetting;
