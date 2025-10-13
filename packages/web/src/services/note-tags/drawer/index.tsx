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
    const handleClose = () => {
      context.emit('close');
    };

    /**
     * 保存
     */
    const handleClickSubmit = () => {
      props.note.update({ tags: props.note.tags, updatedAt: Date.now(), status: NoteStatus.draft });
      handleClose();
    };
    return () => (
      <div class="note-tags-drawer">
        <div class="note-tags-drawer-header">
          <span class="active" onClick={handleClose}>
            取消
          </span>
          <span class="title">添加标签</span>
          <span class="active" onClick={handleClickSubmit}>
            确定
          </span>
        </div>
        <NoteTagsContent note={props.note}></NoteTagsContent>
      </div>
    );
  }
});
