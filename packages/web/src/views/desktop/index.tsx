import { configsStoreState, setConfig } from '@xynotes/store/configs';
import { debounce } from '@xynotes/utils';
import { computed, defineComponent, nextTick, onMounted, ref } from 'vue';
import DesktopMainContainer from './contianer/main';
import DesktopNavMenu, { DESKTOP_NAV_MENU_WIDTH } from './contianer/nav';
import DesktopSideContainer from './contianer/side';
import './index.scss';

// 最大值
export const SIDE_CONTAINER_MAX_WIDTH = 500;

// 最小值
export const SIDE_CONTAINER_MIN_WIDTH = 250;

const Desktop = defineComponent({
  name: 'Desktop',
  setup() {
    /**
     * 分割线
     */
    const refDrapLine = ref<HTMLDivElement>();

    /**
     * 列表栏长度
     */
    const sideContainerWidth = computed(() => {
      return configsStoreState.value.SIDE_CONTAINER_MAX_WIDTH;
    });

    /**
     * 节流保存
     */
    const setSideContainerWidth = debounce((width) => {
      console.info('[config] 保存左侧长度配置', width);
      return setConfig('SIDE_CONTAINER_MAX_WIDTH', width);
    });

    onMounted(() => {
      // 修改侧边栏宽度
      nextTick(() => {
        // pc端
        refDrapLine.value.onmousedown = () => {
          document.onmousemove = (e: MouseEvent) => {
            const clientX = e.clientX - DESKTOP_NAV_MENU_WIDTH;
            const sideContainerWidth = Math.max(SIDE_CONTAINER_MIN_WIDTH, Math.min(clientX, SIDE_CONTAINER_MAX_WIDTH));
            setConfig('SIDE_CONTAINER_MAX_WIDTH', sideContainerWidth, false);
            setSideContainerWidth(sideContainerWidth);
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
            const sideContainerWidth = Math.max(SIDE_CONTAINER_MIN_WIDTH, Math.min(clientX, SIDE_CONTAINER_MAX_WIDTH));
            setConfig('SIDE_CONTAINER_MAX_WIDTH', sideContainerWidth, false);
            setSideContainerWidth(sideContainerWidth);
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
