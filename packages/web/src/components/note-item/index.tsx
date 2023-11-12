import { Note } from '@/services/note';
import { VueComponent } from '@/shims-vue';
import { CreateElement, VNode } from 'vue';
import { Component, Emit, Prop, Ref, Watch } from 'vue-property-decorator';
import { DateFormat } from 'js-lark';
import './index.scss';
import { highLight } from '@/utils';
import { useNotesStore } from '@/store/notes.store';
interface INoteItemProps {
  note: Note; // 笔记信息
  sortIndex: number; // 笔记排序
  keyword?: string; // 关键词
  onselect?: (note: Note) => void;
}

@Component
export default class NoteItem extends VueComponent<INoteItemProps> {
  @Prop() private readonly note!: Note;
  @Prop() private readonly sortIndex!: number;
  @Prop() private readonly keyword!: string;
  @Ref() private readonly noteRef!: HTMLDivElement;

  /**
   * 选中的activeNoteId
   */
  private get activeNote(): Note | undefined {
    const store = useNotesStore();
    return store.activeNote;
  }

  @Watch('sortIndex')
  watchSortIndex(): void {
    this.$nextTick(() => {
      if (this.activeNote?.nid === this.note.nid) {
        this.noteRef?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /**
   * 点击
   */
  @Emit('select')
  private handleClickSelect(event: PointerEvent) {
    return this.note;
  }
  public render(h: CreateElement): VNode {
    return (
      <div
        class={['note-item', 'note-item-index-' + this.sortIndex, { active: this.activeNote?.nid === this.note?.nid }]}
        ref="noteRef"
        onclick={this.handleClickSelect}
      >
        <div class="note-item-header">
          {h('div', {
            class: 'note-item-header__title',
            domProps: {
              innerHTML: highLight(this.keyword, this.note?.title),
            },
          })}
        </div>
        <div class="note-item-content">
          <div class="note-item-content__time">{DateFormat(this.note?.updatedAt)}</div>
          {h('div', {
            class: 'note-item-content__text',
            domProps: {
              innerHTML: highLight(this.keyword, (this?.note.intro || this.note?.text)?.slice(0, 80)),
            },
          })}
        </div>
      </div>
    );
  }
}
