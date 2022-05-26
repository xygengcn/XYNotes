import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import './index.scss';
import NoteList from '@/components/note-list';
import { NoteListSortType } from '@/typings/enum/note';
import { Note } from '@/services/note';
import { useNotesStore } from '@/store/notes.store';
import { useConfigsStore } from '@/store/config.store';
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
  private get noteList() {
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
  public render(): VNode {
    return (
      <div class="desktop-side-container-list-content">
        <div class="desktop-side-container-list-content-list">
          <NoteList noteList={this.noteList} keyword={this.keyword} onselect={this.handleSelectItem}></NoteList>
        </div>
      </div>
    );
  }
}
