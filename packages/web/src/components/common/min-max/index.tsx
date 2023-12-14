import { appWindow } from '@tauri-apps/api/window';
import { PropType, defineComponent, onMounted, ref } from 'vue';
import './index.scss';
import is from '@/utils/is';

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
      if (is.app() && props.type == 'window') {
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
        if (is.app()) {
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
      if (is.app() && props.type == 'window') {
        if (is.mainWindow()) {
          return appWindow.hide();
        }
        appWindow.close();
      }
    };

    /**
     * 最小化
     */
    const handleMinWindow = () => {
      // 禁用
      if (props.disabled.includes('min')) return false;
      context.emit('min');
      if (is.app() && props.type == 'window') {
        appWindow.minimize();
      }
    };

    return () => (
      <div class={{ 'min-max': true, visiable: !isFullScreanWindow.value }} data-tauri-drag-region>
        <i
          class={{ 'icon icon-close-window': true, disabled: props.disabled.includes('close') }}
          none-drag-region
          onClick={handleCloseWindow}
        ></i>
        <i
          class={{ 'icon icon-minus-window': true, disabled: props.disabled.includes('min') }}
          none-drag-region
          onClick={handleMinWindow}
        ></i>
        <i
          class={{ 'icon icon-fullscreen-window': true, disabled: props.disabled.includes('fullscreen') }}
          none-drag-region
          onClick={handleMaxWindow}
        ></i>
      </div>
    );
  }
});

export default MinMax;
