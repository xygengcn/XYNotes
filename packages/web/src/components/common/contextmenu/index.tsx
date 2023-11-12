import { VNode } from 'vue';
import { Component, Emit } from 'vue-property-decorator';
import './index.scss';
import { VueComponent } from '@/shims-vue';
import vClickOutside from 'vue-click-outside';
import { ContextMenuItem } from '@/typings/contextmenu';

interface IContextMenuProps {}
@Component({
  name: 'ContextMenu',
  directives: {
    clickOutside: vClickOutside,
  },
})
export class ContextMenu extends VueComponent<IContextMenuProps> {
  /**
   * 是否显示
   */
  private visible = false;

  /**
   * 菜单
   */
  private menuList: Array<ContextMenuItem> = [];

  private index: string;

  /**
   * 显示
   */
  public show(options: { left: number; top: number; menu: Array<ContextMenuItem>; index: string }): void {
    this.visible = true;
    // 位置定义
    (this.$refs.contextmenu as HTMLDivElement).style.left = options.left + 'px';
    (this.$refs.contextmenu as HTMLDivElement).style.top = options.top + 'px';
    this.menuList = options.menu;
    this.index = options.index;
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
    target.dataset.key && this.$emit('select', target.dataset.key, this.index);
  }

  public render(): VNode {
    return (
      <transition name="fade">
        <div class="contextmenu" ref="contextmenu" v-show={this.visible} vClickOutside={this.close}>
          <transition name="zoom">
            <div class="contextmenu-content" onclick={this.handleClick}>
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
  }
}
