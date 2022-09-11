import { VNode } from 'vue';
import { Component, Emit } from 'vue-property-decorator';
import './index.scss';
import { VueComponent } from '@/shims-vue';
import vClickOutside from 'vue-click-outside';

interface IContextMenuItem<T extends string = string> {
  lable: string;
  key: T;
}

interface IContextMenuProps {
  menu: Array<IContextMenuItem>;
}
@Component({
  name: 'ContextMenu',
  directives: {
    clickOutside: vClickOutside,
  },
})
class ContextMenu extends VueComponent<IContextMenuProps> {
  /**
   * 是否显示
   */
  private visible = false;

  /**
   * 菜单
   */
  private menuList: Array<IContextMenuItem> = [];

  private position: {
    top?: string;
    left?: string;
  } = {};

  /**
   * 显示
   */
  public show(event: PointerEvent, menu: Array<IContextMenuItem>): void {
    this.visible = true;
    this.position = {
      left: event.pageX + 'px',
      top: event.pageY + 'px',
    };
    this.menuList = menu;
  }

  /**
   * 关闭
   */
  @Emit('close')
  public close(): void {
    this.visible = false;
  }

  /**
   * 点击事件
   * @param e
   */
  private handleClick(e: PointerEvent) {
    this.visible = false;
    const target = e.target as HTMLDivElement;
    e.stopPropagation();
    e.preventDefault();
    target.dataset.key && this.$emit('select', target.dataset.key);
  }

  public render(): VNode {
    return (
      <transition name="fade">
        <div
          class="contextmenu"
          style={{ display: this.visible ? 'block' : 'none', ...(this.position || {}) }}
          vClickOutside={this.close}
        >
          <transition name="zoom">
            <div class="contextmenu-content" onclick={this.handleClick}>
              {this.menuList.map((item) => {
                return (
                  <div class="contextmenu-content-item" key={item.key} data-key={item.key}>
                    {item.lable}
                  </div>
                );
              })}
            </div>
          </transition>
        </div>
      </transition>
    );
  }
}

let contextMenuInstance: ContextMenu | null = null;
export default function contextmenu<T extends string>(
  event: PointerEvent,
  menu: Array<IContextMenuItem<T>>,
  select: (e: T) => void
): ContextMenu {
  if (event && menu.length) {
    event.stopPropagation();
    event.preventDefault();
    if (!contextMenuInstance) {
      const panel = document.querySelector('#contextMenu');
      if (panel) {
        document.removeChild(panel);
      }
      const el = document.createElement('div');
      el.id = 'contextMenu';
      document.body.appendChild(el);
      contextMenuInstance = new ContextMenu().$mount(el);
    }
    contextMenuInstance.show(event, menu);
    // 移除以前的事件
    contextMenuInstance.$off('select');
    if (select && typeof select === 'function') {
      select &&
        contextMenuInstance.$on('select', (key) => {
          select(key);
          contextMenuInstance.$off('select');
        });
    }

    return contextMenuInstance;
  }
  return null;
}

export function contextmenuHide() {
  contextMenuInstance?.close();
  contextMenuInstance.$off('select');
}
