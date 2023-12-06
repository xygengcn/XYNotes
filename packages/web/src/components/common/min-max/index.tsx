import { app } from '@tauri-apps/api';
import { appWindow } from '@tauri-apps/api/window';
import { defineComponent, onMounted, ref } from 'vue';
import Icon from '../icon';
import './index.scss';

const MinMax = defineComponent({
  setup() {
    const isFullScrean = ref(false);

    onMounted(async () => {
      if (window.__TAURI__) {
        isFullScrean.value = await appWindow.isFullscreen();
        appWindow.onResized(async () => {
          isFullScrean.value = await appWindow.isFullscreen();
        });
      }
    });

    /**
     * 全屏
     */
    const handleMaxWindow = async () => {
      if (window.__TAURI__) {
        if (await appWindow.isMaximized()) {
          appWindow.setFullscreen(false);
        } else {
          appWindow.setFullscreen(true);
        }
      }
    };

    /**
     * 关闭
     */
    const handleCloseWindow = () => {
      if (window.__TAURI__) {
        app.hide();
      }
    };

    /**
     * 最小化
     */
    const handleMinWindow = () => {
      if (window.__TAURI__) {
        appWindow.minimize();
      }
    };

    return () => (
      <div class={{ 'min-max': true, visiable: !isFullScrean.value }} v-show={window.__TAURI__}>
        <Icon type="close-window" size={13} onclick={handleCloseWindow}></Icon>
        <Icon type="minus-window" size={13} onclick={handleMinWindow}></Icon>
        <Icon type="max-window" size={13} onclick={handleMaxWindow}></Icon>
      </div>
    );
  }
});

export default MinMax;
