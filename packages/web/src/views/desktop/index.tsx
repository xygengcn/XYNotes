import { SideContainerMaxWidth, SideContainerMinWidth, useConfigsStore } from '@/store/config.store';
import { findParentWithNodrag } from '@/utils';
import { appWindow } from '@tauri-apps/api/window';
import { computed, defineComponent, nextTick, onBeforeMount, onMounted, ref } from 'vue';
import './index.scss';
import DesktopMainContainer from './main-container';
import DesktopNavMenu, { DESKTOP_NAV_MENU_WIDTH } from './nav-menu';
import DesktopSideContainer from './side-container';

const Desktop = defineComponent({
  setup() {
    const refDrapLine = ref<HTMLDivElement>();

    const store = useConfigsStore();
    const configStore = useConfigsStore();
    const sideContainerWidth = computed(() => {
      return store.sideContainerWidth;
    });

    onBeforeMount(() => {
      if (window.__TAURI__) {
        document.addEventListener('mousedown', async (e) => {
          const drag = findParentWithNodrag(e.target as HTMLElement);
          if (drag === 'true' || drag === true) {
            return;
          }
          await appWindow.startDragging();
        });
      }
    });

    onMounted(() => {
      // 修改侧边栏宽度
      nextTick(() => {
        // pc端
        refDrapLine.value.onmousedown = () => {
          document.onmousemove = (e: MouseEvent) => {
            const clientX = e.clientX - DESKTOP_NAV_MENU_WIDTH;
            configStore.setSideContainerWidth(clientX);
            return false;
          };
          document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
          };
          return false;
        };
        // 移动端
        refDrapLine.value.ontouchstart = () => {
          document.ontouchmove = (e: TouchEvent) => {
            const clientX = e.touches[0].clientX - DESKTOP_NAV_MENU_WIDTH;
            configStore.setSideContainerWidth(clientX);
          };
        };
        refDrapLine.value.ontouchend = function () {
          document.ontouchmove = null;
        };
      });
    });

    return () => {
      <div class="desktop">
        <DesktopNavMenu />
        <DesktopSideContainer
          width={sideContainerWidth.value}
          maxWidth={SideContainerMaxWidth}
          minWidth={SideContainerMinWidth}
        />
        <div class="desktop-drap-line" ref={refDrapLine}></div>
        <DesktopMainContainer />
      </div>;
    };
  }
});

export default Desktop;
