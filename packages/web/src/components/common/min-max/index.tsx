import { app } from '@tauri-apps/api';
import { appWindow } from '@tauri-apps/api/window';
import { PropType, defineComponent, onMounted, ref } from 'vue';
import './index.scss';

const MinMax = defineComponent({
  props: {
    type: {
      type: String as PropType<'window' | 'dialog'>,
      default: 'window'
    },
    disabled: {
      type: Array as PropType<Array<'close' | 'fullscreen' | 'min'>>,
      default: []
    }
  },
  emits: ['close', 'fullscreen', 'min'],
  setup(props, context) {
    /**
     * 是不是全屏状态
     */
    const isFullScreanWindow = ref(false);

    onMounted(async () => {
      if (window.__TAURI__ && props.type == 'window') {
        isFullScreanWindow.value = await appWindow.isFullscreen();
        appWindow.onResized(async () => {
          isFullScreanWindow.value = await appWindow.isFullscreen();
        });
      }
    });

    /**
     * 全屏
     */
    const handleMaxWindow = async () => {
      // 禁用
      if (props.disabled.includes('fullscreen')) return false;
      context.emit('fullscreen');
      if (props.type == 'window') {
        if (window.__TAURI__) {
          if (await appWindow.isMaximized()) {
            appWindow.setFullscreen(false);
          } else {
            appWindow.setFullscreen(true);
          }
        }
      }
    };

    /**
     * 关闭
     */
    const handleCloseWindow = () => {
      // 禁用
      if (props.disabled.includes('close')) return false;
      context.emit('close');
      if (window.__TAURI__ && props.type == 'window') {
        app.hide();
      }
    };

    /**
     * 最小化
     */
    const handleMinWindow = () => {
      // 禁用
      if (props.disabled.includes('min')) return false;
      context.emit('min');
      if (window.__TAURI__ && props.type == 'window') {
        appWindow.minimize();
      }
    };

    return () => (
      <div class={{ 'min-max': true, visiable: !isFullScreanWindow.value }}>
        <i
          class={{ 'icon icon-close-window': true, disabled: props.disabled.includes('close') }}
          onClick={handleCloseWindow}
        ></i>
        <i
          class={{ 'icon icon-minus-window': true, disabled: props.disabled.includes('min') }}
          onClick={handleMinWindow}
        ></i>
        <i
          class={{ 'icon icon-fullscreen-window': true, disabled: props.disabled.includes('fullscreen') }}
          onClick={handleMaxWindow}
        ></i>
      </div>
    );
  }
});

export default MinMax;
