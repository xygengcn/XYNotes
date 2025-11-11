import { appStoreState } from '@xynotes/store/app';
import { configsStoreState } from '@xynotes/store/configs';
import { computed, defineComponent, ref, watch } from 'vue';
import { DESKTOP_NAV_MENU_WIDTH } from '../nav';
import './index.scss';
export const DesktopLeftContainer = defineComponent({
  name: 'DesktopLeftContainer',
  props: {
    side: {
      type: Boolean,
      default: true
    },
    nav: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    const root = ref<HTMLDivElement>(null);
    // 宽度
    const width = computed(() => {
      if (props.side) {
        return DESKTOP_NAV_MENU_WIDTH + configsStoreState.value.SIDE_CONTAINER_MAX_WIDTH + 'px';
      } else {
        return DESKTOP_NAV_MENU_WIDTH + 'px';
      }
    });

    // 全屏
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
      <div class="desktop-left-container" ref={root} style={{ width: width.value }}>
        <div class="desktop-left-container-wrap">{context.slots.default?.()}</div>
      </div>
    );
  }
});
