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
import apiEvent from '@/api';
import { useNotesStore } from '@/store/notes.store';

interface INoteEditorProps {
  nid: string;
  titleVisible?: boolean;
  onCreated?: (controller: EditorController) => void;
  onMounted?: (controller: EditorController) => void; // 等after
}

@Component
export default class NoteEditor extends VueComponent<INoteEditorProps> {
  /**
   * nid
   */
  @Prop() private readonly nid: string;

  /**
   * 是否显示title
   */
  @Prop({ default: true }) private readonly titleVisible: boolean;

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
   * 当前笔记
   */
  private get activeNote(): Note {
    const store = useNotesStore();
    return store.activeNote;
  }

  /**
   * 监听日记发生变化
   * @param id
   */
  @Watch('nid', { immediate: true })
  watchActiveNodeId(): void {
    const store = useNotesStore();
    if (this.editor) {
      this.editor.editorLoading = true;
    }
    this.editor?.editorController?.setValue(this.activeNote?.text || '');
    /**
     * 拉取最新的内容
     */
    apiEvent
      .apiFetchNoteDetailData(this.nid)
      .then((result) => {
        if (result.nid === this.nid) {
          this.editor?.editorController?.setValue(result.text || '');
          store.updateNote(result);
          return;
        }
      })
      .finally(() => {
        if (this.editor) {
          this.editor.editorLoading = false;
        }
      });

    // 防抖
    this.debounce = debounceMap(
      this.nid,
      (note: Note) => {
        if (this.nid === note.nid) {
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
      this.activeNote?.set({ text: value });
      this.debounce(this.activeNote);
    }
  }

  /**
   * 修改标题
   * @param title
   */
  private handleChangeTitle(title: string): void {
    if (title) {
      this.activeNote?.set({ title });
      this.debounce(this.activeNote);
    }
  }

  public render(): VNode {
    return (
      <div class="note-editor">
        <div class="note-editor-header">
          <span class="note-editor-header__time">{TimeFormat(this.activeNote?.updatedAt, 'yyyy年MM月dd HH:mm')}</span>
          {!!this.textLength && <span class="note-editor-header__count">统计: {this.textLength}</span>}
        </div>
        <div class="note-editor-title" ref="titleRef" style={this.style} vShow={this.titleVisible}>
          <div class="note-editor-title-content" style={{ maxWidth: NoteEditor.maxWidth + 'px' }}>
            <Input value={this.activeNote.title} onchange={this.handleChangeTitle} />
          </div>
        </div>
        <div class="note-editor-content">
          <Editor
            value={this.activeNote.text || ''}
            id={this.activeNote.nid}
            ref="editor"
            onChange={this.handleChangeValue}
            onCounter={(count) => {
              this.textLength = count;
            }}
          />
        </div>
        <div class="note-editor-footer"></div>
      </div>
    );
  }

  public created(): void {
    const fn = (text) => {
      text?.trim() && this.editor?.editorController?.insertValue(text);
    };
    noteEventBus.on('insert', fn);
    this.$once('hook:beforeDestroy', () => {
      noteEventBus.off('insert', fn);
      this.debounce = null;
    });
  }
}
