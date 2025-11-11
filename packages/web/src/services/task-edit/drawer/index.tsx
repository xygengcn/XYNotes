import { Icon, Input, showDatePickerDrawer } from '@xynotes/components';
import type { ITaskItem } from '@xynotes/typings';
import { timeFormat } from '@xynotes/utils';
import { computed, defineComponent, onMounted, ref } from 'vue';
import './index.scss';
export default defineComponent({
  name: 'MarkdownEditorDaysDrawer',
  setup(_, context) {
    const options = ref<ITaskItem>({
      id: undefined,
      title: '',
      quadrant: 'A',
      status: 0,
      priority: 1,
      deadline: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null,
      author: ''
    });
    const refInput = ref<HTMLInputElement>();
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
        initialDate: new Date(options.value.deadline),
        onConfirm: (result) => {
          options.value.deadline = result.date;
        }
      });
    };

    onMounted(() => {
      refInput.value?.focus();
    });

    return () => (
      <div class="task-edit-drawer">
        <div class="task-edit-drawer-header">
          <span class="title">添加任务</span>
          <span class={{ disabled: !enable.value }} onClick={handleClickSubmit}>
            添加
          </span>
        </div>
        <div class="task-edit-drawer-content">
          <div class="task-edit-drawer-content-title">
            <span class="task-edit-drawer-content-title-icon">
              <Icon type="edit-name" size="1.5em"></Icon>
            </span>
            <span class="task-edit-drawer-content-title-input">
              <Input v-model:value={options.value.title} placeholder="输入事项名称" ref={refInput}></Input>
            </span>
          </div>
          <div class="task-edit-drawer-content-date">
            <div class="task-edit-drawer-content-date-title">
              <Icon type="edit-time" size="1.5em"></Icon>
              <span>目标日</span>
            </div>
            <div class="task-edit-drawer-content-date-date" onClick={handleClickTime}>
              <span v-show={options.value.deadline}>{timeFormat(options.value.deadline, 'yyyy年MM月dd日 DD')}</span>
              <span v-show={!options.value.deadline}>设置目标时间</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
