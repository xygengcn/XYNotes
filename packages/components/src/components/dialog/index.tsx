import { PropType, StyleValue, Transition, computed, defineComponent, ref } from 'vue';
import './index.scss';

/**
 * 窗口组件
 */

const Dialog = defineComponent({
  name: 'Dialog',
  props: {
    width: {
      type: [Number, String],
      required: false,
      default: 500
    },
    height: {
      type: [Number, String],
      required: false,
      default: 500
    },
    // 是否需要遮罩层
    modal: {
      type: Boolean,
      required: false,
      default: true
    },
    // 是否可以通过点击 modal 关闭 Dialog
    closeOnClickModal: {
      type: Boolean,
      required: false,
      default: true
    },
    customStyle: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {},
      required: false
    },
    customClass: {
      type: String,
      default: '',
      required: false
    },
    title: {
      type: String,
      default: '',
      required: false
    }
  },
  emits: ['close'],
  setup(props, context) {
    const refDialogWrap = ref<HTMLDivElement>();

    /**
     * 是否全屏
     */
    const isFullscreen = ref(false);

    /**
     * 点击关闭
     * @param e
     */
    const handleClose = (e: Event) => {
      context.emit('close', e);
    };

    /**
     * 点击全屏
     */
    const handleScreen = () => {
      isFullscreen.value = !isFullscreen.value;
    };

    /**
     * 样式
     */
    const wrapStyle = computed<StyleValue>(() => {
      return {
        width: props.width + 'px',
        height: props.height + 'px',
        ...(props.customStyle || {}),
        ...(isFullscreen.value
          ? { width: '100%', height: '100%', maxHeight: '100%', maxWidth: '100%', borderRadius: 0 }
          : {})
      } as StyleValue;
    });

    return {
      handleClose,
      handleScreen,
      refDialogWrap,
      wrapStyle
    };
  },
  render() {
    return (
      <Transition name="fade">
        <div class="dialog">
          {this.$props.modal && (
            <div
              class="dialog-modal"
              onClick={(e) => {
                if (this.$props.closeOnClickModal) {
                  this.handleClose(e);
                }
              }}
            ></div>
          )}
          <Transition name="zoom">
            <div class="dialog-wrap" ref="refDialogWrap" style={this.wrapStyle}>
              {this.$slots.title ? (
                <div class="dialog-header">
                  {this.$slots.title({ onClose: this.handleClose, onFullScreen: this.handleScreen })}
                </div>
              ) : (
                this.$props.title && (
                  <div class="dialog-header">
                    <div class="dialog-header-content">
                      <h3>{this.$props.title}</h3>
                    </div>
                  </div>
                )
              )}
              <div class={['dialog-content', this.$props.customClass]}>{this.$slots.default?.()}</div>
            </div>
          </Transition>
        </div>
      </Transition>
    );
  }
});

export default Dialog;
