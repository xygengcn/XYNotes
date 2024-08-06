import is from '@/utils/is';
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
          if (await window.$appWindow.isMaximized()) {
            window.$appWindow.unmaximize();
          } else {
            window.$appWindow.maximize();
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
        window.$appWindow.closeWindow();
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
        window.$appWindow.minimize();
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
