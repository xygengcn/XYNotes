import { Button, Dialog } from '@xynotes/components';
import { ApiEvent, Note } from '@xynotes/store';
import { NoteStatus } from '@xynotes/typings';
import { defineComponent, ref, type PropType } from 'vue';
import NoteTagsContent from '../content';
import './index.scss';
const NoteTagsDialogCompnent = defineComponent({
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true
    }
  },
  setup(props, context) {
    const note = ref<Note>(props.note);

    // 获取最新的笔记数据
    ApiEvent.api.apiFetchNoteDetailData(props.note.nid).then((data) => {
      note.value = new Note(data);
    });

    const handleClose = () => {
      context.emit('close');
    };

    const handleSubmit = () => {
      handleClose();
      note.value.set({ tags: note.value.tags, status: NoteStatus.draft });
      note.value.save(true);
    };
    return () => (
      <Dialog class="note-tags-dialog" visible={true} onClose={handleClose} title="标签" width={500} height={200}>
        <div class="note-tags-dialog-wrapper">
          <NoteTagsContent note={note.value} />
          <div class="note-tags-dialog-wrapper-footer">
            <Button type="normal" onClick={handleClose}>
              取消
            </Button>
            <Button onClick={handleSubmit}>确定</Button>
          </div>
        </div>
      </Dialog>
    );
  }
});

export default NoteTagsDialogCompnent;
