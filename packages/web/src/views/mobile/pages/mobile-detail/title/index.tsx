import { InputAutoSize } from '@xynotes/components';
import { Note } from '@xynotes/store';
import { NoteStatus } from '@xynotes/typings';
import { defineComponent, type PropType } from 'vue';
import './index.scss';

const MobileDetailTitle = defineComponent({
  name: 'MobileDetailTitle',
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true
    }
  },
  setup(props, context) {
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

    const handleEnter = () => {
      context.emit('enter');
    };

    return () => (
      <div class="mobile-detail-title" v-show={props.note}>
        <div class="mobile-detail-title-content">
          <InputAutoSize value={props.note?.title} onChange={handleChangeTitle} onEnter={handleEnter} />
        </div>
      </div>
    );
  }
});

export default MobileDetailTitle;
