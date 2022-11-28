import Editor, { EditorController } from '@/components/common/editor';
import noteEventBus from '@/event-bus';
import { Note } from '@/services/note';
import { VueComponent } from '@/shims-vue';
import { debounceMap } from '@/utils/debounce-throttle';
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
   * 节流事件
   */
  private debounce: Function;

  /**
   * 字数
   */
  private textLength: number = 0;

  /**
   * 最大长度
   */
  private static maxWidth = 2048;

  /**
   * 监听日记发生变化
   * @param id
   */
  @Watch('note.nid', { immediate: true })
  watchActiveNodeId(id: string): void {
    this.editor?.editorController?.setValue(this.note?.text || '');
    // 防抖
    this.debounce = debounceMap(
      id,
      (note: Note) => {
        if (id === note.nid) {
          note?.save();
        }
      },
      3000
    );
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
    if (value) {
      this.note?.set({ text: value });
      this.debounce(this.note);
    }
  }

  /**
   * 修改标题
   * @param title
   */
  private handleChangeTitle(title: string): void {
    if (title) {
      this.note?.set({ title });
      this.debounce(this.note);
    }
  }

  public render(): VNode {
    return (
      <div class="note-editor">
        <div class="note-editor-header">
          <span class="note-editor-header__time">{TimeFormat(this.note.updatedAt, 'yyyy年MM月dd HH:mm')}</span>
          {!!this.textLength && <span class="note-editor-header__count">统计: {this.textLength}</span>}
        </div>
        <div class="note-editor-title" ref="titleRef" style={this.style}>
          <div class="note-editor-title-content" style={{ maxWidth: NoteEditor.maxWidth + 'px' }}>
            <Input value={this.note.title} onchange={this.handleChangeTitle} />
          </div>
        </div>
        <div class="note-editor-content">
          <Editor
            value={this.note.text || ''}
            id={this.note.nid}
            ref="editor"
            onChange={this.handleChangeValue}
            onCounter={(count) => {
              this.textLength = count;
            }}
          />
        </div>
      </div>
    );
  }

  public created(): void {
    noteEventBus.on('insert', (text) => {
      text?.trim() && this.editor?.editorController?.insertValue(text);
    });
  }

  public beforeDestroy() {
    this.debounce = null;
  }
}
