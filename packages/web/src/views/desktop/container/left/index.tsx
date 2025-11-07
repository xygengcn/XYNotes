import { appStoreState } from '@xynotes/store/app';
import { configsStoreState } from '@xynotes/store/configs';
import { defineComponent, ref, watch } from 'vue';
import { DESKTOP_NAV_MENU_WIDTH } from '../nav';
import './index.scss';
export const DesktopLeftContainer = defineComponent({
  name: 'DesktopLeftContainer',
  setup(_, context) {
    const root = ref<HTMLDivElement>(null);
    watch(
      () => appStoreState.value.desktopFullScreen,
      () => {
        if (appStoreState.value.desktopFullScreen) {
          root.value.style = 'width:0px;opacity:0;';
        } else {
          root.value.style = `width:${
            DESKTOP_NAV_MENU_WIDTH + configsStoreState.value.SIDE_CONTAINER_MAX_WIDTH
          }px;opacity:1;}`;
        }
      }
    );
    return () => (
      <div
        class="desktop-left-container"
        ref={root}
        style={{ width: DESKTOP_NAV_MENU_WIDTH + configsStoreState.value.SIDE_CONTAINER_MAX_WIDTH + 'px' }}
      >
        <div class="desktop-left-container-wrap">{context.slots.default?.()}</div>
      </div>
    );
  }
});
