import is from '@/utils/is';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { Window } from '@tauri-apps/api/window';
import { PropType, defineComponent } from 'vue';
import './index.scss';

const MinMax = defineComponent({
  name: 'MinMax',
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
     * 全屏
     */
    const handleMaxWindow = async () => {
      // 禁用
      if (props.disabled.includes('fullscreen')) return false;
      context.emit('fullscreen');
      if (props.type == 'window') {
        if (is.app()) {
          const appWindow = Window.getCurrent();
          if (await appWindow.isMaximized()) {
            appWindow.unmaximize();
          } else {
            appWindow.maximize();
          }
        }
      }
    };

    /**
     * 关闭
     */
    const handleCloseWindow = async () => {
      // 禁用
      if (props.disabled.includes('close')) return false;
      context.emit('close');
      if (is.app() && props.type == 'window') {
        const appWindow = Window.getCurrent();
        appWindow.close();
      }
    };

    /**
     * 最小化
     */
    const handleMinWindow = async () => {
      // 禁用
      if (props.disabled.includes('min')) return false;
      context.emit('min');
      if (is.app() && props.type == 'window') {
        const appWindow = WebviewWindow.getCurrent();
        appWindow.minimize();
      }
    };

    return () => (
      <div class={{ 'min-max': true, visiable: true }} data-tauri-drag-region>
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
