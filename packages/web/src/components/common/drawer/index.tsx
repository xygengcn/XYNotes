import { PropType, defineComponent, ref, watch } from 'vue';
import './index.scss';

const Drawer = defineComponent({
  name: 'Drawer',
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    position: {
      type: String as PropType<'top' | 'bottom'>,
      default: 'bottom'
    }
  },
  emits: ['close'],
  setup(props, context) {
    // 关闭事件
    const handleClose = () => {
      context.emit('close');
    };

    // 获取节点
    const refContent = ref<HTMLDivElement>();

    watch(
      () => props.visible,
      () => {
        if (props.visible) {
          refContent.value.classList.remove(`drawer-content-${props.position}__close`);
          refContent.value.classList.add(`drawer-content-${props.position}__open`);
        } else {
          refContent.value.classList.remove(`drawer-content-${props.position}__open`);
          refContent.value.classList.add(`drawer-content-${props.position}__close`);
        }
      }
    );

    return () => (
      <div class={{ drawer: true, 'drawer-close': !props.visible }}>
        <div class="drawer-shadow" onClick={handleClose}></div>
        <div ref={refContent} class={['drawer-content', `drawer-content-${props.position}`]}>
          {context.slots.default()}
        </div>
      </div>
    );
  }
});

export default Drawer;
