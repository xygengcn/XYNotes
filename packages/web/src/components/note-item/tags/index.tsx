import type { Note } from '@xynotes/store';
import { defineComponent, type PropType } from 'vue';
import './index.scss';
import { searchNoteList } from '@xynotes/store/note';
export default defineComponent({
  name: 'NoteItemTags',
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true
    }
  },
  setup(props) {
    const handleClickTag = (event: Event, tag: string) => {
      event.preventDefault();
      event.stopPropagation();
      searchNoteList(`#${tag}`);
    };
    return () => (
      <div class="note-item-tags" v-show={props.note?.tags?.length}>
        {props.note?.tags?.map((tag) => (
          <span class="tag" onClick={(e: Event) => handleClickTag(e, tag)}>
            #{tag}
          </span>
        ))}
      </div>
    );
  }
});
