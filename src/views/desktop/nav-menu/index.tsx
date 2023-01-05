import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import './index.scss';
import DesktopNavMenuItem, { IdesktopNavMenuItem } from './nav-menu-item';
import { useNotesStore } from '@/store/notes.store';
import logo from '@/assets/images/logo/logo.png';
interface IDesktopNavMenuProps {}

@Component({ name: 'DesktopNavMenu' })
export default class DesktopNavMenu extends VueComponent<IDesktopNavMenuProps> {
  // 左侧菜单长度
  public static DESKTOP_NAV_MENU_WIDTH = 60;

  // 左侧菜单
  private get desktopNavMenuList(): IdesktopNavMenuItem[] {
    const store = useNotesStore();
    return [
      {
        title: '新增',
        icon: 'nav-editing',
        name: 'desktop-edit',
        visible: true,
        action: () => {
          store.addNote();
        },
      },
      {
        title: '列表',
        icon: 'nav-list',
        name: 'desktop-list',
        visible: true,
        path: '/',
      },
      {
        title: '回收',
        icon: 'nav-recycle',
        name: 'desktop-recycle',
        visible: true,
        path: '/recycle',
        size: 18,
      },
      {
        title: '设置',
        icon: 'nav-setting',
        visible: true,
        name: 'desktop-setting',
        path: '/setting',
      },
    ];
  }

  public render(): VNode {
    return (
      <div class="desktop-nav-menu" style={{ width: `${DesktopNavMenu.DESKTOP_NAV_MENU_WIDTH}px` }}>
        <div class="desktop-nav-menu-top">
          <img src={logo} alt="" class="desktop-nav-menu-top-logo" />
        </div>
        <div class="desktop-nav-menu-content">
          <div class="desktop-nav-menu-content-list">
            {this.desktopNavMenuList.map((item) => {
              return item.visible && <DesktopNavMenuItem menu={item} />;
            })}
          </div>
        </div>
        <div class="desktop-nav-menu-bottom">
          <div class="desktop-nav-menu-bottom-version" v-tippy={{ placement: 'right', content: '此项目开源于XY笔记' }}>
            <a href="https://github.com/xygengcn/XYNotes" target="_blank">
              V{__APP_VERSION__}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
