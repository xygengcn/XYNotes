import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import './index.scss';
import { NoteListSortType } from '@/typings/enum/note';
import { Note } from '@/services/note';
import { useNotesStore } from '@/store/notes.store';
import { useConfigsStore } from '@/store/config.store';
import NoteItem from '@/components/note-item';
import vContextMenu from '@/directive/contextmenu';
interface IDesktopSideContainerListContentProps {
  keyword?: string;
}

@Component({
  name: 'DesktopSideContainerListContent',
  directives: {
    contextmenu: vContextMenu,
  },
})
export default class DesktopSideContainerListContent extends VueComponent<IDesktopSideContainerListContentProps> {
  @Prop() private readonly keyword!: string;

  /**
   * 排序类型
   */
  private get noteListSortType() {
    const store = useConfigsStore();
    return store.noteListSort?.value || NoteListSortType.updated;
  }
  // 笔记列表
  private get noteList(): Note[] {
    const store = useNotesStore();
    return store.notesList
      .filter((note) => {
        if (this.keyword.trim()) {
          return note.text.includes(this.keyword) || note.title.includes(this.keyword);
        }
        return true;
      })
      .sort((a, b) => {
        return b[this.noteListSortType] - a[this.noteListSortType];
      });
  }

  /**
   * 选中
   * @param note
   */
  private handleSelectItem(note: Note) {
    const store = useNotesStore();
    store.setActiveNoteId(note.nid);
  }

  // 显示数量
  private listLimit = 20;

  public render(): VNode {
    return (
      <div class="desktop-side-container-list-content">
        <div
          class="desktop-side-container-list-content-list"
          onscroll={this.handleScroll}
          vContextmenu={{
            menu: [{ label: '删除', value: 'delete' }],
            onSelect: (value, index) => {
              this.handleContextmenu(value, index);
            },
          }}
        >
          {this.noteList.slice(0, this.listLimit).map((note, index) => {
            return (
              <div class="desktop-side-container-list-content-list-item" data-index={note.nid}>
                <NoteItem
                  note={note}
                  key={note.nid}
                  sortIndex={index}
                  keyword={this.keyword}
                  onselect={this.handleSelectItem}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /**
   * 右键
   * @param cmdKey
   * @param index
   */
  private handleContextmenu(cmdKey: string, index: string) {
    const note = index && this.noteList.find((n) => n.nid === index);
    console.log('[contextmenu] 右键笔记', cmdKey, index, note);
    if (note) {
      switch (cmdKey) {
        case 'delete':
          window.$ui.confirm({
            type: 'warn',
            width: 250,
            content: '确定删除这个笔记吗？',
            onSubmit: (context) => {
              note.delete();
              context.close();
            },
          });
          break;
      }
    }
  }

  /**
   * 滚动, 主动置顶
   * @param e
   */
  private handleScroll(e: Event): void {
    const target = e.target as HTMLDivElement;
    if (target && target.scrollTop + target.clientHeight + 30 >= target.scrollHeight) {
      this.listLimit += 10;
      this.listLimit = Math.max(this.noteList.length, this.listLimit);
    }
  }
}
