import { Input } from '@xynotes/components';
import { NoteStatus } from '@xynotes/typings';
import { Note } from '@xynotes/store';
import { defineComponent, type PropType } from 'vue';
import './index.scss';

const NoteEditorTitle = defineComponent({
  name: 'NoteEditorTitle',
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true
    }
  },
  setup(props) {
    /*
     * 修改标题
     * @param title
     */
    const handleChangeTitle = (title: string) => {
      if (title) {
        props.note.set({ title, status: NoteStatus.draft });
        props.note.save(false);
      }
    };

    return () => (
      <div class="note-editor-title" v-show={props.note}>
        <div class="note-editor-title-content">
          <Input value={props.note?.title} onChange={handleChangeTitle} />
        </div>
      </div>
    );
  }
});

export default NoteEditorTitle;
