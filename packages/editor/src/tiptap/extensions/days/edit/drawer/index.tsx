import { Icon, Input, showDatePickerDrawer } from '@xynotes/components';
import { timeFormat } from '@xynotes/utils';
import { computed, defineComponent, ref } from 'vue';
import { getRandomColor } from '../../colorUtils';
import { IDaysOptions } from '../../type';
import './index.scss';
export default defineComponent({
  name: 'MarkdownEditorDaysDrawer',
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
      showDatePickerDrawer({
        initialDate: new Date(options.value.endTime),
        onConfirm: (result) => {
          options.value.endTime = result.date.getTime();
        }
      });
    };

    return () => (
      <div class="markdown-editor-days-drawer">
        <div class="markdown-editor-days-drawer-header">
          <span class="title">添加事项</span>
          <span class={{ disabled: !enable.value }} onClick={handleClickSubmit}>
            添加
          </span>
        </div>
        <div class="markdown-editor-days-drawer-content">
          <div class="markdown-editor-days-drawer-content-title">
            <span class="markdown-editor-days-drawer-content-title-icon">
              <Icon type="days-name" size="1.5em"></Icon>
            </span>
            <span class="markdown-editor-days-drawer-content-title-input">
              <Input v-model:value={options.value.title} placeholder="输入事项名称"></Input>
            </span>
          </div>
          <div class="markdown-editor-days-drawer-content-date">
            <div class="markdown-editor-days-drawer-content-date-title">
              <Icon type="days-time" size="1.5em"></Icon>
              <span>目标日（未来日期为倒数、过去时间为正数）</span>
            </div>
            <div class="markdown-editor-days-drawer-content-date-date" onClick={handleClickTime}>
              <span>{timeFormat(options.value.endTime, 'yyyy年MM月dd日 DD')}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
