import logo from '@/assets/images/logo/logo.png';
import MinMax from '@/components/min-max';
import { Loading } from '@xynotes/components';
import { AppLoadStatus } from '@xynotes/store';
import { appStoreState, isCheckOnlineSync } from '@xynotes/store/app';
import { addNote, setActiveNoteId } from '@xynotes/store/note';
import { taskStoreAction, taskStoreState } from '@xynotes/store/task';
import { is } from '@xynotes/utils';
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import './index.scss';
import DesktopNavMenuItem, { type IdesktopNavMenuItem } from './nav-menu-item';

export const DESKTOP_NAV_MENU_WIDTH = 64;

const DesktopNavContainer = defineComponent({
  name: 'DesktopNavContainer',
  setup() {
    const router = useRouter();
    const desktopNavMenuList = computed<IdesktopNavMenuItem[]>(() => [
      {
        title: '新增',
        icon: 'create',
        name: 'desktop-edit',
        visible: true,
        path: '/',
        action: () => {
          const note = addNote();
          setActiveNoteId(note.nid);
          router.push({
            name: 'desktop-main-list-detail',
            params: {
              nid: note.nid
            }
          });
        }
      },
      {
        title: '列表',
        icon: 'list',
        name: 'desktop-main',
        visible: true,
        path: '/'
      },
      {
        title: '待办',
        icon: 'task',
        name: 'desktop-task',
        visible: isCheckOnlineSync.value,
        path: '/task',
        size: 18,
        badge: taskStatusCount.value ? taskStatusCount.value.toString() : ''
      },
      {
        title: '归档',
        icon: 'archive',
        name: 'desktop-archive',
        visible: true,
        path: '/archive',
        size: 18
      },
      {
        title: '设置',
        icon: 'setting',
        visible: true,
        name: 'desktop-setting',
        path: '/setting'
      }
    ]);

    // 待办数量
    const taskStatusCount = computed(() => {
      return Object.values(taskStoreState.taskStatus).reduce((total, item) => {
        return total + item;
      }, 0);
    });

    onBeforeMount(() => {
      taskStoreAction.status();
    });

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
            {desktopNavMenuList.value.map((item) => {
              return item.visible && <DesktopNavMenuItem menu={item} />;
            })}
          </div>
        </div>
        <div class="desktop-nav-menu-bottom">
          <div class="desktop-nav-menu-bottom-loading" v-show={appStoreState.value.loadStatus !== AppLoadStatus.finish}>
            <Loading />
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

export default DesktopNavContainer;
