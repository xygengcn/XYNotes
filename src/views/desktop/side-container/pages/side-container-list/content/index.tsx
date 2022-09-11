import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import './index.scss';
import { NoteListSortType } from '@/typings/enum/note';
import { Note } from '@/services/note';
import { useNotesStore } from '@/store/notes.store';
import { useConfigsStore } from '@/store/config.store';
import NoteItem from '@/components/note-item';
import contextmenu from '@/components/common/contextmenu';
interface IDesktopSideContainerListContentProps {
  keyword?: string;
}

@Component
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
          oncontextmenu={this.handleContextmenu}
        >
          {this.noteList.slice(0, this.listLimit).map((note, index) => {
            return (
              <div class="desktop-side-container-list-content-list-item" data-index={index}>
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

  private handleContextmenu(event: PointerEvent & { path: Array<HTMLElement> }) {
    const el = event?.path.find((el) => el?.dataset?.index);
    const note = el?.dataset?.index && this.noteList?.[el.dataset.index];
    if (note) {
      contextmenu(event, [{ lable: '删除', key: 'delete' }], (key) => {
        switch (key) {
          case 'delete':
            window.$ui.confirm({
              type: 'warn',
              width: 250,
              content: '确定删除这个笔记吗？',
              onSubmit: (context) => {
                note?.delete();
                context.close();
              },
            });
            break;
        }
      });
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
