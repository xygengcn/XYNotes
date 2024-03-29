import { Note } from '@/services/note';
import { TimeFormat } from 'js-lark';
import { defineComponent, PropType } from 'vue';
import './index.scss';

/**
 * 字数
 */

const NoteEditorCounter = defineComponent({
  name: 'NoteEditorCounter',
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true
    }
  },
  setup(props) {
    return () => (
      <div class="note-editor-counter" data-tauri-drag-region>
        <span class="note-editor-counter-time" data-tauri-drag-region>
          {TimeFormat(props.note?.updatedAt, 'yyyy年MM月dd HH:mm')}
        </span>
        {!!props.note?.counter && (
          <span class="note-editor-counter-count" data-tauri-drag-region>
            统计: {props.note?.counter}
          </span>
        )}
      </div>
    );
  }
});

export default NoteEditorCounter;
