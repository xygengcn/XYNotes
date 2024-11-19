import logo from '@/assets/images/logo/logo.png';
import MinMax from '@/components/common/min-max';
import { useNotesStore } from '@/store/notes.store';
import { defineComponent } from 'vue';
import './index.scss';
import DesktopNavMenuItem, { IdesktopNavMenuItem } from './nav-menu-item';
import is from '@/utils/is';
import { Loading } from '@xynotes/components';
import { AppLoadStatus, useAppStore } from '@/store/app.store';

export const DESKTOP_NAV_MENU_WIDTH = 64;

const DesktopNavMenu = defineComponent({
  name: 'DesktopNavMenu',
  setup() {
    const noteStore = useNotesStore();
    const appStore = useAppStore();

    const desktopNavMenuList: IdesktopNavMenuItem[] = [
      {
        title: '新增',
        icon: 'nav-editing',
        name: 'desktop-edit',
        visible: true,
        action: () => {
          noteStore.addNote();
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
            <MinMax v-show={is.app()}></MinMax>
          </div>
          <div class="desktop-nav-menu-top-logo">
            <img src={logo} alt="" data-tauri-drag-region />
          </div>
        </div>
        <div class="desktop-nav-menu-content" data-tauri-drag-region>
          <div class="desktop-nav-menu-content-list" data-tauri-drag-region>
            {desktopNavMenuList.map((item) => {
              return item.visible && <DesktopNavMenuItem menu={item} />;
            })}
          </div>
        </div>
        <div class="desktop-nav-menu-bottom">
          <div class="desktop-nav-menu-bottom-loading" v-show={appStore.loadStatus !== AppLoadStatus.finish}>
            <Loading color="var(--font-default-color)"></Loading>
          </div>
          <div class="desktop-nav-menu-bottom-version">
            <a
              href="https://github.com/xygengcn/XYNotes"
              target="_blank"
              v-tippy={{ placement: 'right', content: '此项目开源于XY笔记' }}
            >
              V{__APP_VERSION__}
            </a>
          </div>
        </div>
      </div>
    );
  }
});

export default DesktopNavMenu;
