import { Component, PropType, createApp, defineComponent, h, nextTick, ref, watch } from 'vue';
import './index.scss';

const DrawerIndex = ref(99);

const Drawer = defineComponent({
  name: 'Drawer',
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    position: {
      type: String as PropType<'top' | 'bottom'>,
      default: 'bottom',
      require: false
    },
    height: {
      type: String,
      default: '80%',
      require: false
    }
  },
  emits: ['close', 'update:visible'],
  setup(props, context) {
    const index = DrawerIndex.value++;
    // 关闭事件
    const handleClose = () => {
      document.addEventListener(
        'animationend',
        () => {
          context.emit('close');
        },
        { once: true }
      );
      context.emit('update:visible', false);
    };

    // 获取节点
    const refContent = ref<HTMLDivElement>();

    watch(
      () => props.visible,
      (value) => {
        nextTick(() => {
          if (value) {
            refContent.value?.classList.remove(`drawer-content-${props.position}__close`);
            refContent.value?.classList.add(`drawer-content-${props.position}__open`);
          } else {
            refContent.value?.classList.remove(`drawer-content-${props.position}__open`);
            refContent.value?.classList.add(`drawer-content-${props.position}__close`);
          }
        });
      },
      { immediate: true }
    );

    return () => (
      <div class={{ drawer: true, 'drawer-close': !props.visible }} style={{ zIndex: index }}>
        <div class="drawer-shadow" onClick={handleClose}></div>
        <div
          ref={refContent}
          class={['drawer-content', `drawer-content-${props.position}`]}
          style={{ height: props.height }}
        >
          {context.slots.default?.()}
        </div>
      </div>
    );
  }
});

export default Drawer;

export const useDrawer = (
  DrawerComponent: Component,
  options: {
    id: string;
    drawerOptions?: {
      position?: 'top' | 'bottom';
      height: string;
    };
    contentProps?: object;
  }
) => {
  if (!options?.id) {
    throw new Error('[useDrawer] id is not exist');
  }
  const instance = document.querySelector(`#${options.id}`);
  if (instance) {
    document.body.removeChild(instance);
  }
  const el = document.createElement('div');
  el.style = 'height: 100vh;width: 100vw;';
  el.id = options.id;
  document.body.appendChild(el);
  const visible = ref(false);
  const AppView: Component = () => {
    return (
      <Drawer
        v-model:visible={visible.value}
        class={`${options.id}-wrapper`}
        {...(options.drawerOptions || {})}
        onClose={() => {
          app.unmount();
          el && document.body.removeChild(el);
        }}
      >
        {h(DrawerComponent, {
          ...(options.contentProps || {}),
          onClose: () => {
            visible.value = false;
          }
        })}
      </Drawer>
    );
  };
  const app = createApp(AppView);
  app.mount(el);
  return {
    show: () => {
      visible.value = true;
    },
    close: () => {
      visible.value = false;
    }
  };
};
