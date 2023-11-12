import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import IconNavMenu from '@/components/icon-nav-menu';
import './index.scss';

interface IDesktopNavMenuItemProps {
  menu: IdesktopNavMenuItem;
}

export interface IdesktopNavMenuItem {
  title: string;
  icon: string;
  name: string;
  action?: (menu: IdesktopNavMenuItem) => void;
  path?: string;
  visible: boolean;
  size?: number;
}

@Component({ name: 'DesktopNavMenuItem' })
export default class DesktopNavMenuItem extends VueComponent<IDesktopNavMenuItemProps> {
  @Prop() private readonly menu!: IdesktopNavMenuItem;

  /**
   * 当前路由
   */
  private get activeNavMenu() {
    return this.$route.name;
  }

  /**
   * 点击左侧菜单
   */
  private handleClickNavMenu(): void {
    if (this.menu.path) {
      this.$router.push(this.menu.path);
    }
    this.menu?.action?.(this.menu);
  }

  public render(): VNode {
    return (
      <div class="desktop-nav-menu-content-list-item">
        <div class="desktop-nav-menu-content-list-item-content">
          <IconNavMenu
            v-tippy={{ placement: 'right', content: this.menu.title }}
            width={30}
            height={30}
            size={this.menu.size || 14}
            type={this.menu.icon}
            active={this.menu.name === this.activeNavMenu}
            nativeOnclick={this.handleClickNavMenu}
          />
        </div>
      </div>
    );
  }
}
