import { Note } from '@/services/note';
import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import showScreenshotDialog from '@/components/screenshot';
import './index.scss';
import { useNotesStore } from '@/store/notes.store';
import IconNavMenu from '@/components/icon-nav-menu';

interface IDesktopMainContainerDefaultRightProps {
  note: Note;
}

@Component
export default class DesktopMainContainerDefaultRight extends VueComponent<IDesktopMainContainerDefaultRightProps> {
  @Prop() private readonly note: Note;

  private get menuList() {
    const store = useNotesStore();
    return [
      {
        title: '分享',
        icon: 'nav-share',
        visible: !!this.note,
        action: () => {
          this.note && showScreenshotDialog(this.note);
        },
      },
      {
        title: '删除',
        icon: 'nav-delete',
        visible: !!this.note,
        action: () => {
          this.note && store.deleteNote(this.note);
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
                size={14}
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
