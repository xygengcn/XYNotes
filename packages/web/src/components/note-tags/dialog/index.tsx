import { Button, Dialog } from '@xynotes/components';
import type { Note } from '@xynotes/store';
import { NoteStatus } from '@xynotes/typings';
import { defineComponent, type PropType } from 'vue';
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
    const handleClose = () => {
      context.emit('close');
    };

    const handleSubmit = () => {
      handleClose();
      props.note.set({ tags: props.note.tags, status: NoteStatus.draft });
      props.note.save(true);
    };
    return () => (
      <Dialog class="note-tags-dialog" visible={true} sho onClose={handleClose} title="标签" width={500} height={200}>
        <div class="note-tags-dialog-wrapper">
          <NoteTagsContent note={props.note} />
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
