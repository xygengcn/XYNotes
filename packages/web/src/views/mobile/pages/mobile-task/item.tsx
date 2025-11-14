import { showTaskDrawer } from '@/services/task-edit';
import { Checkbox, Icon } from '@xynotes/components';
import { taskStoreAction } from '@xynotes/store/task';
import type { ITaskItem } from '@xynotes/typings';
import { dateFormat, timeFormat } from '@xynotes/utils';
import { defineComponent, toRaw, type PropType } from 'vue';
import './item.scss';

export const MobileTaskItem = defineComponent({
  name: 'MobileTaskItem',
  props: {
    task: Object as PropType<ITaskItem>
  },
  setup(props) {
    // 切换任务完成状态
    const handleChange = (val: boolean) => {
      if (val) {
        props.task.status = 1;
        props.task.priority = 0; // 完成后优先级降低
        props.task.completedAt = new Date();
      } else {
        props.task.status = 0;
        props.task.completedAt = null;
      }
      taskStoreAction.saveTask(props.task);
    };

    // 删除任务
    const handleClickDelete = () => {
      taskStoreAction.deleteTask(props.task);
    };

    const handleClickSetting = (e: Event) => {
      e.stopPropagation();
      showTaskDrawer(
        structuredClone(toRaw(props.task)),
        (task) => {
          taskStoreAction.saveTask(task);
        },
        () => {
          handleClickDelete();
        }
      );
    };
    return () => (
      <div class={{ 'mobile-task-item': true, done: props.task.status === 1 }} onClick={handleClickSetting}>
        <div class="mobile-task-item-checkbox" onClick={(e) => e.stopPropagation()}>
          <Checkbox value={props.task.status === 1} onChange={handleChange}></Checkbox>
        </div>
        <div class="mobile-task-item-content">
          <div class="mobile-task-item-content-title">{props.task.title}</div>
          <div class="mobile-task-item-content-desc" v-show={props.task.deadline && !props.task.completedAt}>
            <Icon type="edit-time" size="14px"></Icon>
            <span class="deadline">{timeFormat(props.task.deadline, 'yyyy年MM月dd日')}</span>
          </div>
          <div class="mobile-task-item-content-desc" v-show={props.task.completedAt}>
            <Icon type="task" size="14px"></Icon>
            <span class="completed">{dateFormat(props.task.completedAt, 'yyyy年MM月dd日')}</span>
          </div>
        </div>
      </div>
    );
  }
});
