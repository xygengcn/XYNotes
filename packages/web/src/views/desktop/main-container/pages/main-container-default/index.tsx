import { Icon } from '@xynotes/components';
import { defineComponent } from 'vue';
import './index.scss';

const DesktopMainContainerDefault = defineComponent({
  name: 'DesktopMainContainerDefault',
  setup() {
    return () => (
      <div class="desktop-main-container-default">
        <div class="desktop-main-container-default-blank" data-tauri-drag-region>
          <Icon type="logo" size={200} data-tauri-drag-region></Icon>
        </div>
      </div>
    );
  }
});

export default DesktopMainContainerDefault;
