import { Checkbox } from '@xynotes/components';
import type { ITaskItem } from '@xynotes/typings';
import { timeFormat } from '@xynotes/utils';
import { defineComponent, type PropType } from 'vue';
import './item.scss';

export const DesktopTaskMainTaskItem = defineComponent({
  name: 'DesktopTaskMainTaskItem',
  props: {
    task: Object as PropType<ITaskItem>
  },
  setup(props) {
    return () => (
      <div class="desktop-task-main-task-item">
        <div class="desktop-task-main-task-item-checkbox">
          <Checkbox
            value={props.task.status === 1}
            onChange={(val: boolean) => {
              if (val) {
                props.task.status = 1;
              } else {
                props.task.status = 0;
              }
            }}
          ></Checkbox>
        </div>
        <div class="desktop-task-main-task-item-content">
          <div class="desktop-task-main-task-item-content-title">{props.task.title}</div>
          <div class="desktop-task-main-task-item-content-desc" v-show={props.task.deadline}>
            <span>{timeFormat(props.task.deadline, 'MM月dd日')}</span>
          </div>
        </div>
      </div>
    );
  }
});
