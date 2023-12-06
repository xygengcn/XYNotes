import { PropType, StyleValue, defineComponent } from 'vue';
import Icon from '../icon';
import './index.scss';

/**
 * 窗口组件
 */

const Dialog = defineComponent({
  name: 'Dialog',
  props: {
    width: {
      type: Number,
      required: false,
      default: 500,
    },
    height: {
      type: Number,
      required: false,
      default: 500,
    },
    // 是否需要遮罩层
    modal: {
      type: Boolean,
      required: false,
      default: true,
    },
    // 是否可以通过点击 modal 关闭 Dialog
    closeOnClickModal: {
      type: Boolean,
      required: false,
      default: true,
    },
    customStyle: {
      type: Object as PropType<CSSStyleDeclaration>,
      default: () => {},
      required: false,
    },
    customClass: {
      type: String,
      default: '',
      required: false,
    },
    title: {
      type: String,
      default: '',
      required: false,
    },
  },
  emits: ['close'],
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    handleClose() {
      this.$data.visible = false;
    },
  },
  render() {
    return (
      <transition name="fade">
        <div class="dialog" style={{ display: this.visible ? 'block' : 'none' }}>
          {this.$props.modal && (
            <div
              class="dialog-modal"
              onClick={() => {
                if (this.$props.closeOnClickModal) {
                  this.handleClose();
                }
              }}
            ></div>
          )}
          <transition name="zoom">
            <div
              class="dialog-wrap"
              style={
                {
                  width: this.$props.width + 'px',
                  height: this.$props.height + 'px',
                  ...(this.$props.customStyle || {}),
                } as StyleValue
              }
            >
              {this.$props.title && (
                <div class="dialog-header">
                  <h3>{this.$props.title}</h3>
                  <Icon type="close" size={20} onclick={this.handleClose}></Icon>
                </div>
              )}
              <div class={['dialog-content', this.$props.customClass]}>{this.$slots.default?.()}</div>
            </div>
          </transition>
        </div>
      </transition>
    );
  },
});

export default Dialog;
