import logo from '@/assets/images/logo/logo.png';
import MinMax from '@/components/common/min-max';
import { useNotesStore } from '@/store/notes.store';
import { defineComponent } from 'vue';
import './index.scss';
import DesktopNavMenuItem, { IdesktopNavMenuItem } from './nav-menu-item';

export const DESKTOP_NAV_MENU_WIDTH = 64;

const DesktopNavMenu = defineComponent({
  name: 'DesktopNavMenu',
  setup() {
    const store = useNotesStore();

    const desktopNavMenuList: IdesktopNavMenuItem[] = [
      {
        title: '新增',
        icon: 'nav-editing',
        name: 'desktop-edit',
        visible: true,
        action: () => {
          store.addNote();
        }
      },
      {
        title: '列表',
        icon: 'nav-list',
        name: 'desktop-list',
        visible: true,
        path: '/'
      },
      {
        title: '回收',
        icon: 'nav-recycle',
        name: 'desktop-recycle',
        visible: true,
        path: '/recycle',
        size: 18
      },
      {
        title: '设置',
        icon: 'nav-setting',
        visible: true,
        name: 'desktop-setting',
        path: '/setting'
      }
    ];

    return () => (
      <div class="desktop-nav-menu" style={{ width: `${DESKTOP_NAV_MENU_WIDTH}px` }}>
        <div class="desktop-nav-menu-top">
          <div class="desktop-nav-menu-top-opts">
            <MinMax></MinMax>
          </div>
          <div class="desktop-nav-menu-top-logo">
            <img src={logo} alt="" />
          </div>
        </div>
        <div class="desktop-nav-menu-content">
          <div class="desktop-nav-menu-content-list">
            {desktopNavMenuList.map((item) => {
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
});

export default DesktopNavMenu;
