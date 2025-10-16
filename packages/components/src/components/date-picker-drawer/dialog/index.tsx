import { defineComponent, type PropType } from 'vue';
import Dialog from '../../dialog';
import DatePickerComponent, { DatePickerOptions } from '../content';
import './index.scss';
const NoteTagsDialogCompnent = defineComponent({
  props: {
    options: {
      type: Object as PropType<DatePickerOptions>,
      required: true
    }
  },
  emits: ['close', 'confirm'],
  setup(props, context) {
    const handleClose = () => {
      context.emit('close');
    };

    const handleSubmit = (options) => {
      context.emit('confirm', options);
      handleClose();
    };
    return () => (
      <Dialog class="date-picker-dialog" visible={true} onClose={handleClose} title={null} width={500} height={400}>
        <DatePickerComponent
          options={props.options}
          onClose={handleClose}
          onConfirm={handleSubmit}
        ></DatePickerComponent>
      </Dialog>
    );
  }
});

export default NoteTagsDialogCompnent;
