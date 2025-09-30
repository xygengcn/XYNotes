import { Icon } from '@xynotes/components';
import type { Note } from '@xynotes/store';
import { NoteStatus } from '@xynotes/typings';
import { defineComponent, type PropType } from 'vue';
import NoteTagsContent from '../content';
import './index.scss';

export default defineComponent({
  name: 'NoteTagsDrawer',
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true
    }
  },
  setup(props, context) {
    const hide = () => {
      context.emit('close');
    };

    /**
     * 保存
     */
    const handleClickSubmit = () => {
      props.note.set({ tags: props.note.tags, status: NoteStatus.draft });
      props.note.save(true);
      hide();
    };
    return () => (
      <div class="note-tags-drawer">
        <div class="note-tags-drawer-header">
          <span class="active" onClick={hide}>
            取消
          </span>
          <span class="title">
            <Icon type="tags" size={24}></Icon>
          </span>
          <span class="active" onClick={handleClickSubmit}>
            确定
          </span>
        </div>
        <NoteTagsContent note={props.note}></NoteTagsContent>
      </div>
    );
  }
});
