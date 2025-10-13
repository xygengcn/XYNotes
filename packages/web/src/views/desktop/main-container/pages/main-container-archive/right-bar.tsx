import IconNavMenu from '@/components/icon-nav-menu';
import { Note } from '@xynotes/store';
import { copyText } from '@xynotes/utils';
import { type PropType, defineComponent } from 'vue';
import './index.scss';

const DesktopMainContainerArchiveRight = defineComponent({
  name: 'DesktopMainContainerArchiveRight',
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true
    }
  },
  setup(props) {
    const menuList = [
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
        icon: 'item-json-download',
        visible: true,
        action: (note: Note) => {
          if (note) {
            note.toJson();
          }
        }
      },
      {
        title: 'Markdown下载',
        icon: 'item-markdown',
        visible: true,
        action: (note: Note) => {
          if (note) {
            note.toMarkdown();
          }
        }
      },

      {
        title: '移除',
        icon: 'item-delete',
        visible: true,
        action: (note: Note) => {
          if (note) {
            window.$ui.confirm({
              type: 'warn',
              content: `确定移除《${note.title}》这个笔记吗？`,
              onSubmit: () => {
                note.remove();
              }
            });
          }
        }
      }
    ];

    return () => (
      <div class="desktop-main-container-archive-content-right" data-tauri-drag-region>
        {menuList.map((menu) => {
          return (
            menu.visible && (
              <div
                class="desktop-main-container-archive-content-right-menu"
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

export default DesktopMainContainerArchiveRight;
