import IconNavMenu from '@/components/icon-nav-menu';
import showShareNoteDialog from '@/services/note-share';
import showNoteTagsDialog from '@/services/note-tags';
import { UploadService } from '@/services/upload';
import { createWindow } from '@xynotes/app-api';
import { useEditor } from '@xynotes/editor';
import { Note } from '@xynotes/store';
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
    const { setTable, setImage, setCodeBlock } = useEditor();
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
        title: '图片',
        icon: 'photo',
        visible: true,
        action: () => {
          UploadService.select({ accept: 'image/*' }).then((files) => {
            UploadService.upload(files, (file) => {
              setImage({
                src: file.originUrl,
                alt: file.name
              });
            });
          });
        }
      },
      {
        title: '表格',
        icon: 'table',
        visible: true,
        action: () => {
          setTable();
        }
      },
      {
        title: '思维导图',
        icon: 'mind',
        visible: true,
        action: () => {
          setCodeBlock('mindmap', '- 主题1\n  - 主题2\n  - 主题3');
        }
      },
      {
        title: '分享',
        icon: 'share',
        visible: true,
        action: (note: Note) => {
          note && showShareNoteDialog(note);
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
