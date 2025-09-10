import { Icon } from '@xynotes/components';
import { Note } from '@xynotes/store';
import { activeNote, notesStoreState } from '@xynotes/store/note';
import { dateFormat, highLight, preventDefault } from '@xynotes/utils';
import { type PropType, defineComponent, h, nextTick, ref, watch } from 'vue';
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
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    select: (note: Note) => note
  },
  setup(props, context) {
    /**
     * 节点
     */
    const refNote = ref<HTMLDivElement>();

    /**
     * 选中
     */
    const handleClickSelect = async () => {
      if (activeNote.value && activeNote.value?.nid !== props.note.nid) {
        await activeNote.value.save(true);
      }
      context.emit('select', props.note);
    };

    watch(
      () => props.sortIndex,
      () => {
        nextTick(() => {
          if (notesStoreState.value.activeNoteId === props.note.nid) {
            refNote.value?.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    );

    return () => (
      <div
        class={['note-item', 'note-item-index-' + props.sortIndex, { active: props.active }]}
        ref={refNote}
        onClick={handleClickSelect}
        onDblClick={preventDefault}
      >
        <div class="note-item-header">
          <span
            class={[
              'note-item-header__onlineTag',
              props.note.onlineSyncAt === props.note.updatedAt ? 'online' : 'draft'
            ]}
            v-show={props.note.onlineSyncAt}
          >
            <Icon type="online"></Icon>
          </span>
          {h('span', {
            class: 'note-item-header__title',
            innerHTML: highLight(props.keyword, props.note.title)
          })}
        </div>
        <div class="note-item-content">
          <div class="note-item-content__time">{dateFormat(props.note?.updatedAt)}</div>
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
