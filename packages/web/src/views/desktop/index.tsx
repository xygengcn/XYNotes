import { SIDE_CONTAINER_MAX_WIDTH, SIDE_CONTAINER_MIN_WIDTH, useConfigsStore } from '@/store/config.store';
import { computed, defineComponent, nextTick, onMounted, ref } from 'vue';
import './index.scss';
import DesktopMainContainer from './main-container';
import DesktopNavMenu, { DESKTOP_NAV_MENU_WIDTH } from './nav-menu';
import DesktopSideContainer from './side-container';

const Desktop = defineComponent({
  name: 'Desktop',
  setup() {
    /**
     * 分割线
     */
    const refDrapLine = ref<HTMLDivElement>();

    /**
     * store
     */
    const store = useConfigsStore();
    const configStore = useConfigsStore();

    /**
     * 列表栏长度
     */
    const sideContainerWidth = computed(() => {
      return store.sideContainerWidth;
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

    return () => (
      <div class="desktop">
        <DesktopNavMenu />
        <DesktopSideContainer
          width={sideContainerWidth.value}
          maxWidth={SIDE_CONTAINER_MAX_WIDTH}
          minWidth={SIDE_CONTAINER_MIN_WIDTH}
        />
        <div class="desktop-drap-line" ref={refDrapLine}></div>
        <DesktopMainContainer />
      </div>
    );
  }
});

export default Desktop;
