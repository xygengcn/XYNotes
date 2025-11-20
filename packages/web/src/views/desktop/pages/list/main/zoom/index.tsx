import { Icon } from '@xynotes/components';
import { appStoreAction, appStoreState } from '@xynotes/store/app';
import { defineComponent } from 'vue';
import './index.scss';

export const DesktopMainContainerDetailZoom = defineComponent({
  name: 'DesktopMainContainerDetailZoom',
  setup() {
    return () => (
      <div class="desktop-main-container-detail-zoom">
        <Icon
          type={appStoreState.value.desktopFullScreen ? 'zoomOut' : 'zoomIn'}
          onClick={() => appStoreAction.setDesktopFullScreen(!appStoreState.value.desktopFullScreen)}
        ></Icon>
      </div>
    );
  }
});
