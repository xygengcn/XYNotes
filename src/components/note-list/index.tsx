import { Note } from '@/services/note';
import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import './index.scss';
import NoteItem from '../note-item';
interface INoteListProps {
  noteList: Note[];
  keyword?: string;
  onselect?: (note: Note) => void;
}

@Component
export default class NoteList extends VueComponent<INoteListProps> {
  // 数据
  @Prop({ default: () => [] }) private readonly noteList!: Note[];
  // 关键词
  @Prop() private readonly keyword!: string;

  // 显示数量
  private listLimit = 20;

  @Emit('select')
  private handleSelect(note: Note) {
    return note;
  }

  public render(): VNode {
    return (
      <div class="note-list" onscroll={this.handleScroll}>
        <div class="note-list-content">
          {this.noteList.slice(0, this.listLimit).map((note, index) => {
            return (
              <NoteItem
                note={note}
                key={note.nid}
                sortIndex={index}
                keyword={this.keyword}
                onselect={this.handleSelect}
              />
            );
          })}
        </div>
      </div>
    );
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
