import { ApiEvent, Note } from '@xynotes/store';
import { NoteStatus } from '@xynotes/typings';
import { defineComponent, ref, type PropType } from 'vue';
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
    const note = ref<Note>();

    // 获取最新的笔记数据
    ApiEvent.api.apiFetchNoteDetailData(props.note.nid).then((data) => {
      note.value = new Note(data);
    });
    const handleClose = () => {
      context.emit('close');
    };

    /**
     * 保存
     */
    const handleClickSubmit = () => {
      note.value.set({ tags: note.value.tags, status: NoteStatus.draft });
      note.value.save(true);
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
        <NoteTagsContent note={note.value}></NoteTagsContent>
      </div>
    );
  }
});
