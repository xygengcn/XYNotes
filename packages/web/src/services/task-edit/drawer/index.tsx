import { Icon, Input, Popover, showDatePickerDialog } from '@xynotes/components';
import { TaskQuadrant, TaskQuadrantText, type ITaskItem } from '@xynotes/typings';
import { timeFormat, uuid } from '@xynotes/utils';
import { computed, defineComponent, ref, type PropType } from 'vue';
import './index.scss';
export default defineComponent({
  name: 'TaskEditDrawer',
  props: {
    task: {
      type: Object as PropType<ITaskItem>,
      default: () => ({})
    }
  },
  setup(props, context) {
    const options = ref<ITaskItem>(
      props.task || {
        id: undefined,
        taskId: uuid(),
        title: '',
        quadrant: TaskQuadrant.A,
        status: 0,
        priority: 0,
        deadline: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        completedAt: null,
        author: ''
      }
    );
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
      showDatePickerDialog({
        initialDate: new Date(options.value.deadline),
        onConfirm: (result) => {
          options.value.deadline = result.date;
        }
      });
    };

    const handleClickDelete = () => {
      context.emit('delete');
      handleClose();
    };

    return () => (
      <div class="task-edit-drawer">
        <div class="task-edit-drawer-header">
          <span class="title">添加目标</span>
          <span class={{ disabled: !enable.value }} onClick={handleClickSubmit}>
            保存
          </span>
        </div>
        <div class="task-edit-drawer-content">
          <div class="task-edit-drawer-content-title">
            <span class="task-edit-drawer-content-title-icon">
              <Icon type="edit-name" size="1.5em"></Icon>
            </span>
            <span class="task-edit-drawer-content-title-input">
              <Input v-model:value={options.value.title} placeholder="输入目标名称" ref={refInput}></Input>
            </span>
          </div>
          <div class="task-edit-drawer-content-quadrant">
            <div class="task-edit-drawer-content-quadrant-title">
              <Icon type="quadrant" size="1.5em"></Icon>
              <span>优先级</span>
            </div>
            <div class="task-edit-drawer-content-quadrant-content">
              <Popover
                position="right"
                v-slots={{
                  default: () => (
                    <span class={`task-edit-drawer-content-quadrant-content-text ${options.value.quadrant}`}>
                      {TaskQuadrantText[options.value.quadrant]}
                    </span>
                  ),
                  popover: () => (
                    <ul class="task-edit-drawer-content-quadrant-content-options">
                      <li onClick={() => (options.value.quadrant = TaskQuadrant.A)}>
                        <span class="A">{TaskQuadrantText.A}</span>
                      </li>
                      <li onClick={() => (options.value.quadrant = TaskQuadrant.B)}>
                        <span class="B">{TaskQuadrantText.B}</span>
                      </li>
                      <li onClick={() => (options.value.quadrant = TaskQuadrant.C)}>
                        <span class="C">{TaskQuadrantText.C}</span>
                      </li>
                      <li onClick={() => (options.value.quadrant = TaskQuadrant.D)}>
                        <span class="D">{TaskQuadrantText.D}</span>
                      </li>
                    </ul>
                  )
                }}
              ></Popover>
            </div>
          </div>
          <div class="task-edit-drawer-content-date">
            <div class="task-edit-drawer-content-date-title">
              <Icon type="edit-time" size="1.5em"></Icon>
              <span>目标时间</span>
            </div>
            <div class="task-edit-drawer-content-date-date" onClick={handleClickTime}>
              <span v-show={options.value.deadline}>{timeFormat(options.value.deadline, 'yyyy年MM月dd日 DD')}</span>
              <span v-show={!options.value.deadline}>设置目标时间</span>
            </div>
          </div>
          <div class="task-edit-drawer-content-delete" v-show={options.value.id} onClick={handleClickDelete}>
            <span>删除目标</span>
          </div>
        </div>
      </div>
    );
  }
});
