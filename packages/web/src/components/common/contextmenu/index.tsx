import { IContextMenuItem, IContextMenuProps } from '@/typings/contextmenu';
import vClickOutside from 'click-outside-vue3';
import { PropType, Transition, createApp, defineComponent, onMounted, ref } from 'vue';
import './index.scss';

/**
 * 右键菜单
 */

const ContextMenuComponent = defineComponent({
  name: 'ContextMenuComponent',
  emits: {
    close: () => true,
    select: (options: { menu: IContextMenuItem }) => true
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    left: { type: Number, required: true },
    top: { type: Number, required: true },
    menuList: {
      type: Array as PropType<Array<IContextMenuItem>>,
      required: true
    }
  },
  setup(props, context) {
    const visible = ref(false);

    const refContextmenu = ref<HTMLDivElement>();
    /**
     * 点击
     * @param e
     */
    const handleClick = (e: Event) => {
      const target = e.target as HTMLDivElement;
      e.stopPropagation();
      e.preventDefault();
      context.emit('select', { menu: props.menuList[target.dataset.index || 0] });
      handleClose();
    };
    /**
     * 关闭
     */
    const handleClose = () => {
      context.emit('close');
    };
    /**
     * 定位
     */
    onMounted(() => {
      visible.value = true;
    });
    return {
      visible,
      refContextmenu,
      handleClick,
      handleClose
    };
  },
  render() {
    return (
      <Transition name="fade">
        <div class="contextmenu" ref="refContextmenu" v-show={this.visible} v-clickOutside={this.handleClose}>
          <Transition name="zoom">
            <div class="contextmenu-content" onClick={this.handleClick}>
              {this.menuList.map((item, index) => {
                return (
                  <div class="contextmenu-content-item" key={item.value} data-index={index}>
                    {item.label}
                  </div>
                );
              })}
            </div>
          </Transition>
        </div>
      </Transition>
    );
  }
});

/**
 * 右键函数
 * @param e
 * @param menuList
 * @param onSubmit
 */
export default function contextMenu(menuList: IContextMenuItem[], onSubmit: (options: IContextMenuProps) => void) {
  console.log('[contextMenu]', menuList);
  const instance = document.querySelector('#contextmenu');
  if (instance) {
    document.body.removeChild(instance);
  }
  const el = document.createElement('div');
  el.id = 'contextmenu';
  document.body.appendChild(el);
  const app = createApp(ContextMenuComponent, {
    menuList,
    onSelect(options: IContextMenuProps) {
      onSubmit?.(options);
    },
    onClose() {
      app.unmount();
      el && document.body.removeChild(el);
    }
  });
  app.mount(el);
  return el;
}
