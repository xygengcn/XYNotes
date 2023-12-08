import IconNavMenu from '@/components/icon-nav-menu';
import showShareNoteDialog from '@/components/note-share';
import { Note } from '@/services/note';
import { copyText } from '@/utils';
import { downloadFile } from '@/utils/file';
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
        action: () => {
          props.note && showShareNoteDialog(props.note);
        }
      },
      {
        title: '复制',
        icon: 'item-copy',
        visible: true,
        action: () => {
          if (props.note.text) {
            copyText(props.note.text || '');
            window.$ui.toast('复制文本成功');
          }
        }
      },
      {
        title: 'JSON下载',
        icon: 'item-json-download',
        visible: true,
        action: () => {
          props.note && downloadFile(JSON.stringify(props.note) || '', `${props.note.title || 'XYNote'}.json`);
        }
      },
      {
        title: '删除',
        icon: 'item-delete',
        visible: true,
        action: () => {
          props.note &&
            window.$ui.confirm({
              type: 'warn',
              width: 300,
              content: '确定删除这个笔记吗？',
              onSubmit: () => {
                props.note.delete();
              }
            });
        }
      }
    ];

    return () => (
      <div class="desktop-main-container-default-content-right">
        {menuList.map((menu) => {
          return (
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
                  menu.action();
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }
});

export default DesktopMainContainerDefaultRight;
