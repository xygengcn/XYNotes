import { Note } from '@/services/note';
import { useNotesStore } from '@/store/notes.store';
import { highLight } from '@/utils';
import { DateFormat } from 'js-lark';
import { PropType, computed, defineComponent, h, nextTick, ref, watch } from 'vue';
import './index.scss';

const NoteItem = defineComponent({
  name: 'NoteItem',
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true
    },
    sortIndex: {
      type: Number,
      required: true
    },
    keyword: {
      type: String,
      default: ''
    }
  },
  emits: {
    select: (note: Note) => true
  },
  setup(props, context) {
    const store = useNotesStore();

    /**
     * 节点
     */
    const refNote = ref<HTMLDivElement>();

    /**
     * 选中
     */
    const activeNoteId = computed(() => {
      return store.activeNoteId;
    });

    /**
     * 选中
     */
    const handleClickSelect = async () => {
      if (store.activeNote) {
        await store.activeNote.save(true);
      }
      context.emit('select', props.note);
    };

    watch(
      () => props.sortIndex,
      () => {
        nextTick(() => {
          if (activeNoteId.value === props.note.nid) {
            refNote.value?.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    );

    return () => (
      <div
        class={['note-item', 'note-item-index-' + props.sortIndex, { active: activeNoteId.value === props.note?.nid }]}
        ref={refNote}
        onClick={handleClickSelect}
      >
        <div class="note-item-header">
          {h('div', {
            class: 'note-item-header__title',
            innerHTML: highLight(props.keyword, props.note.title)
          })}
        </div>
        <div class="note-item-content">
          <div class="note-item-content__time">{DateFormat(props.note?.updatedAt)}</div>
          {h('div', {
            class: 'note-item-content__text',
            innerHTML: highLight(props.keyword, (props.note.intro || props.note.text)?.slice(0, 80))
          })}
        </div>
      </div>
    );
  }
});

export default NoteItem;
