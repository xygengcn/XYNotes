import { Button, Dialog, Icon, Input, showDatePickerDialog } from '@xynotes/components';

import { timeFormat } from '@xynotes/utils';
import { computed, defineComponent, ref } from 'vue';
import { getRandomColor } from '../../colorUtils';
import { IDaysOptions } from '../../type';
import './index.scss';
const MarkdownEditorDaysDialogCompnent = defineComponent({
  setup(_, context) {
    const options = ref<IDaysOptions>({ title: '', endTime: Date.now(), type: 'days', countColor: getRandomColor() });

    const enable = computed(() => {
      return options.value.title.trim().length > 0;
    });
    const handleClose = () => {
      context.emit('close');
    };

    /**
     * 保存
     */
    const handleClickSubmit = () => {
      context.emit('submit', options.value);
      handleClose();
    };

    const handleClickTime = () => {
      showDatePickerDialog({
        initialDate: new Date(options.value.endTime),
        onConfirm: (result) => {
          options.value.endTime = result.date.getTime();
        }
      });
    };

    return () => (
      <Dialog
        class="markdown-editor-days-dialog"
        visible={true}
        onClose={handleClose}
        title="添加事项"
        width={500}
        height={'max-content'}
      >
        <div class="markdown-editor-days-dialog-wrapper">
          <div class="markdown-editor-days-dialog-content">
            <div class="markdown-editor-days-dialog-content-title">
              <span class="markdown-editor-days-dialog-content-title-icon">
                <Icon type="days-name" size="1.5em"></Icon>
              </span>
              <span class="markdown-editor-days-dialog-content-title-input">
                <Input v-model:value={options.value.title} placeholder="输入事项名称"></Input>
              </span>
            </div>
            <div class="markdown-editor-days-dialog-content-date">
              <div class="markdown-editor-days-dialog-content-date-title">
                <Icon type="days-time" size="1.5em"></Icon>
                <span>目标日（未来日期为倒数、过去时间为正数）</span>
              </div>
              <div class="markdown-editor-days-dialog-content-date-date" onClick={handleClickTime}>
                <span>{timeFormat(options.value.endTime, 'yyyy年MM月dd日 DD')}</span>
              </div>
            </div>
          </div>
          <div class="markdown-editor-days-dialog-wrapper-footer">
            <Button onClick={handleClickSubmit} disabled={!enable.value}>
              确定
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
});

export default MarkdownEditorDaysDialogCompnent;
