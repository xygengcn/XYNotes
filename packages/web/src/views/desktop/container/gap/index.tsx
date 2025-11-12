import { setConfig } from '@xynotes/store/configs';
import { debounce } from '@xynotes/utils';
import { defineComponent, nextTick, onMounted, ref } from 'vue';
import { DESKTOP_NAV_MENU_WIDTH } from '../nav';
import { SIDE_CONTAINER_MAX_WIDTH, SIDE_CONTAINER_MIN_WIDTH } from '../side';
import './index.scss';
const DesktopGap = defineComponent({
  name: 'DesktopGap',
  setup() {
    /**
     * 分割线
     */

    const refDrapLine = ref<HTMLDivElement>();

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
    return () => <div class="desktop-gap" ref={refDrapLine}></div>;
  }
});

export default DesktopGap;
