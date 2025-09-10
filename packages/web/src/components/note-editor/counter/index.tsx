import { useEditor, type MarkdownEditorInstance } from '@xynotes/editor';
import { Note } from '@xynotes/store';
import { timeFormat } from '@xynotes/utils';
import { defineComponent, nextTick, ref, watch, type PropType } from 'vue';
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
    const { getCounter, onCreated, onChange } = useEditor() as MarkdownEditorInstance;
    const counter = ref<{ characters: number; words: number }>({ characters: 0, words: 0 });
    onChange(() => {
      counter.value = getCounter();
    });
    onCreated(() => {
      counter.value = getCounter();
    });
    watch(
      () => props.note?.nid,
      () => {
        nextTick(() => {
          counter.value = getCounter();
        });
      }
    );
    return () => (
      <div class="note-editor-counter" data-tauri-drag-region>
        <span class="note-editor-counter-time" data-tauri-drag-region>
          {timeFormat(props.note?.updatedAt, 'yyyy年MM月dd HH:mm')}
        </span>
        {!!props.note && (
          <span class="note-editor-counter-count" data-tauri-drag-region>
            统计: {counter.value.characters}
          </span>
        )}
      </div>
    );
  }
});

export default NoteEditorCounter;
