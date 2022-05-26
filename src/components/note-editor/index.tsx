import Editor from '@/components/common/editor';
import EditorController from '@/services/editor';
import { Note } from '@/services/note';
import { VueComponent } from '@/shims-vue';
import { getDeviceType, TimeFormat } from 'js-lark';
import { VNode } from 'vue';
import { Component, Prop, Ref, Watch } from 'vue-property-decorator';
import Input from '../common/input';
import './index.scss';

interface INoteEditorProps {
  note: Note;
  onCreated?: (controller: EditorController) => void;
  onMounted?: (controller: EditorController) => void; // 等after
}

@Component
export default class NoteEditor extends VueComponent<INoteEditorProps> {
  @Prop() private readonly note!: Note;

  @Ref() private readonly editor!: Editor;

  @Ref() private readonly titleRef!: HTMLDivElement;

  /**
   * 最大长度
   */

  private static maxWidth = 2048;

  /**
   * 选中的id
   */
  get activeNoteId(): string {
    return this.note?.nid || '';
  }

  @Watch('activeNoteId')
  watchActiveNodeId(): void {
    this.editor?.editorController?.setValue(this.note?.text || '');
  }

  /**
   * 长度
   */
  private get style() {
    if (getDeviceType() !== 'mobile') {
      if (this.titleRef) {
        const grap = this.titleRef.clientWidth - NoteEditor.maxWidth / 2;
        return {
          paddingLeft: Math.max(35, grap) + 'px',
          paddingRight: Math.max(35, grap) + 'px',
        };
      }
      return {
        paddingLeft: 35 + 'px',
        paddingRight: 35 + 'px',
      };
    }
    return {
      paddingLeft: 10 + 'px',
      paddingRight: 10 + 'px',
    };
  }

  /**
   * 修改数据
   * @param value
   */
  private handleChangeValue(value: string): void {
    this.note?.save({ text: value });
  }

  /**
   * 修改标题
   * @param title
   */
  private handleChangeTitle(title: string): void {
    this.note?.save({ title });
  }

  public render(): VNode {
    return (
      <div class="note-editor">
        <div class="note-editor-header">
          <span class="note-editor-header__time">{TimeFormat(this.note.updatedAt, 'yyyy年MM月dd HH:mm')}</span>
        </div>
        <div class="note-editor-title" ref="titleRef" style={this.style}>
          <div class="note-editor-title-content" style={{ maxWidth: NoteEditor.maxWidth + 'px' }}>
            <Input value={this.note.title} onchange={this.handleChangeTitle} />
          </div>
        </div>
        <div class="note-editor-content">
          <Editor value={this.note?.text || ''} ref="editor" onchange={this.handleChangeValue} />
        </div>
      </div>
    );
  }
}
