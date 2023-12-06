import { ContextMenuItem } from '@/typings/contextmenu';
import vClickOutside from 'click-outside-vue3';
import { defineComponent } from 'vue';
import './index.scss';

const ContextMenu = defineComponent({
  emits: {
    close: () => {},
    select: (key: string) => {},
  },
  data() {
    return {
      visible: false,
      menuList: [] as Array<ContextMenuItem>,
    };
  },
  methods: {
    show(options: { left: number; top: number; menu: Array<ContextMenuItem> }) {
      this.visible = true;
      // 位置定义
      (this.$refs.contextmenu as HTMLDivElement).style.left = options.left + 'px';
      (this.$refs.contextmenu as HTMLDivElement).style.top = options.top + 'px';
      this.menuList = options.menu;
    },
    handleClick(e: Event) {
      this.visible = false;
      const target = e.target as HTMLDivElement;
      e.stopPropagation();
      e.preventDefault();
      target.dataset.key && this.$emit('select', target.dataset.key);
    },
    handleClose() {
      this.visible = false;
      this.$emit('close');
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  render() {
    return (
      <transition name="fade">
        <div class="contextmenu" ref="contextmenu" v-show={this.visible} v-clickOutside={this.handleClose}>
          <transition name="zoom">
            <div class="contextmenu-content" onClick={this.handleClick}>
              {this.menuList.map((item) => {
                return (
                  <div class="contextmenu-content-item" key={item.value} data-key={item.value}>
                    {item.label}
                  </div>
                );
              })}
            </div>
          </transition>
        </div>
      </transition>
    );
  },
});

export default ContextMenu;
