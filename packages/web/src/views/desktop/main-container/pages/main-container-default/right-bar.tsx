import IconNavMenu from '@/components/icon-nav-menu';
import showShareNoteDialog from '@/components/note-share';
import showNoteTagsDialog from '@/services/note-tags';
import { createWindow } from '@xynotes/app-api';
import { Note } from '@xynotes/store';
import { copyText } from '@xynotes/utils';
import { type PropType, defineComponent } from 'vue';
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
        title: '标签',
        icon: 'tags',
        visible: true,
        action: (note: Note) => {
          note && showNoteTagsDialog(note);
        }
      },
      {
        title: '预览',
        icon: 'image-preview',
        visible: true,
        action: (note: Note) => {
          note && showShareNoteDialog(note);
        }
      },
      {
        title: '复制',
        icon: 'copy',
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
        icon: 'json-download',
        visible: true,
        action: (note: Note) => {
          if (note) {
            note.toJson();
          }
        }
      },
      {
        title: 'Markdown下载',
        icon: 'markdown',
        visible: true,
        action: (note: Note) => {
          if (note) {
            note.toMarkdown();
          }
        }
      },
      {
        title: '分屏',
        icon: 'splitscreen',
        visible: true,
        action: (note: Note) => {
          if (note) {
            createWindow({ nid: note.nid });
          }
        }
      },
      {
        title: '同步',
        icon: 'sync',
        visible: true,
        action: (note: Note) => {
          if (note) {
            note.sync();
          }
        }
      },
      {
        title: '归档',
        icon: 'trash',
        visible: true,
        action: (note: Note) => {
          if (note) {
            window.$ui.confirm({
              type: 'warn',
              content: `归档后的笔记不再支持编辑，确定归档《${note.title}》这个笔记吗？`,
              onSubmit: () => {
                note.archive();
              }
            });
          }
        }
      }
    ];

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
