import { Note } from '@/services/note';
import { getDeviceType } from 'js-lark';
import { computed, defineComponent, PropType } from 'vue';
import Input from '@/components/common/input';
import './index.scss';
import { INoteStatus } from '@/typings/note';

const NoteEditorTitle = defineComponent({
  name: 'NoteEditorTitle',
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true
    }
  },
  setup(props) {
    /**
     * 样式
     */
    const style = computed(() => {
      if (getDeviceType() !== 'mobile') {
        return {
          paddingLeft: 35 + 'px',
          paddingRight: 35 + 'px'
        };
      }
      return {
        paddingLeft: 10 + 'px',
        paddingRight: 10 + 'px'
      };
    });

    /*
     * 修改标题
     * @param title
     */
    const handleChangeTitle = (title: string) => {
      if (title) {
        props.note.set({ title, status: INoteStatus.draft });
        props.note.save();
      }
    };

    return () => (
      <div class="note-editor-title" style={style.value} v-show={props.note}>
        <div class="note-editor-title-content">
          <Input value={props.note?.title} onChange={handleChangeTitle} />
        </div>
      </div>
    );
  }
});

export default NoteEditorTitle;
