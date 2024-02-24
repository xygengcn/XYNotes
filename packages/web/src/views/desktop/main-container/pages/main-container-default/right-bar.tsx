import IconNavMenu from '@/components/icon-nav-menu';
import showShareNoteDialog from '@/components/note-share';
import { Note } from '@/services/note';
import { copyText } from '@/utils';
import is from '@/utils/is';
import { PropType, defineComponent } from 'vue';
import './index.scss';

const DesktopMainContainerDefaultRight = defineComponent({
  name: 'DesktopMainContainerDefaultRight',
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true
    }
  },
  setup(props) {
    const menuList = [
      {
        title: '预览',
        icon: 'item-preview',
        visible: true,
        action: (note: Note) => {
          note && showShareNoteDialog(note);
        }
      },
      {
        title: '复制',
        icon: 'item-copy',
        visible: true,
        action: (note: Note) => {
          if (note.text) {
            copyText(note.text || '');
            window.$ui.toast('复制文本成功');
          }
        }
      },
      {
        title: 'JSON下载',
        icon: 'item-json-download',
        visible: true,
        action: (note: Note) => {
          if (note) {
            note.toJson();
          }
        }
      },
      {
        title: '分屏',
        icon: 'item-splitscreen',
        visible: is.app(),
        action: (note: Note) => {
          if (note) {
            handleSplitScreen(note);
          }
        }
      },
      {
        title: '删除',
        icon: 'item-delete',
        visible: true,
        action: (note: Note) => {
          if (note) {
            window.$ui.confirm({
              type: 'warn',
              content: `确定删除《${note.title}》这个笔记吗？`,
              onSubmit: () => {
                note.delete();
              }
            });
          }
        }
      }
    ];

    // 新开页面
    const handleSplitScreen = (note: Note) => {
      window.createWindow({ nid: note.nid, remoteId: note.remoteId });
    };

    return () => (
      <div class="desktop-main-container-default-content-right" data-tauri-drag-region>
        {menuList.map((menu) => {
          return (
            menu.visible && (
              <div
                class="desktop-main-container-default-content-right-menu"
                v-tippy={{ placement: 'left', content: menu.title }}
              >
                <IconNavMenu
                  width={30}
                  height={30}
                  size={18}
                  type={menu.icon}
                  onClick={() => {
                    menu.action(props.note);
                  }}
                />
              </div>
            )
          );
        })}
      </div>
    );
  }
});

export default DesktopMainContainerDefaultRight;
