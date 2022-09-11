import { Note } from '@/services/note';
import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import showShareNoteDialog from '@/components/note-share';
import './index.scss';
import IconNavMenu from '@/components/icon-nav-menu';
import { downloadFile } from '@/utils/file';
import { copyText } from '@/utils';

interface IDesktopMainContainerDefaultRightProps {
  note: Note;
}

@Component
export default class DesktopMainContainerDefaultRight extends VueComponent<IDesktopMainContainerDefaultRightProps> {
  @Prop() private readonly note: Note;

  private get menuList() {
    return [
      {
        title: '预览',
        icon: 'item-preview',
        visible: !!this.note,
        action: () => {
          this.note && showShareNoteDialog(this.note);
        },
      },
      {
        title: '复制',
        icon: 'item-copy',
        visible: !!this.note,
        action: () => {
          if (this.note?.text) {
            copyText(this.note?.text || '');
            window.$ui.toast('复制文本成功');
          }
        },
      },
      {
        title: 'JSON',
        icon: 'item-json-download',
        visible: !!this.note,
        action: () => {
          this.note && downloadFile(JSON.stringify(this.note) || '', `${this.note?.title || 'XYNote'}.json`);
        },
      },
      {
        title: '删除',
        icon: 'item-delete',
        visible: !!this.note,
        action: () => {
          window.$ui.confirm({
            type: 'warn',
            width: 300,
            content: '确定删除这个笔记吗？',
            onSubmit: (context) => {
              this.note?.delete();
              context.close();
            },
          });
        },
      },
    ];
  }
  public render(): VNode {
    return (
      <div class="desktop-main-container-default-content-right">
        {this.menuList.map((menu) => {
          return (
            <div class="desktop-main-container-default-content-right-menu">
              <IconNavMenu
                width={30}
                height={30}
                size={18}
                type={menu.icon}
                nativeOnclick={() => {
                  menu.action();
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
