import showTaskDialog from '@/services/task-edit';
import { Card, Icon } from '@xynotes/components';
import { TaskQuadrant, TaskQuadrantText, type ITaskItem } from '@xynotes/typings';
import { defineComponent, ref } from 'vue';
import { VueDraggable, type SortableEvent } from 'vue-draggable-plus';
import './index.scss';
import { DesktopTaskMainTaskItem } from './item';

const TaskQuadrantList = [
  {
    value: TaskQuadrant.A,
    title: TaskQuadrantText.A
  },
  {
    value: TaskQuadrant.B,
    title: TaskQuadrantText.B
  },
  {
    value: TaskQuadrant.C,
    title: TaskQuadrantText.C
  },
  {
    value: TaskQuadrant.D,
    title: TaskQuadrantText.D
  }
];

export default defineComponent({
  name: 'DesktopTaskMain',
  setup() {
    /**
     * 任务列表
     */
    const taskList = ref<Record<string, ITaskItem[]>>({
      A: [],
      B: [],
      C: [],
      D: []
    });

    /**
     * 列表排序事件处理
     * @param event
     */
    const handleListSortEvent = (event: SortableEvent) => {
      switch (event.type) {
        case 'add': {
          const toGroupName = event.to.dataset.groupname;
          const taskId = ((event as any).data as ITaskItem)?.id;
          if (taskId) {
            const task = taskList.value[toGroupName].find((task) => task.id === taskId);
            if (task) {
              task.quadrant = toGroupName;
            }
          }
        }
      }
    };

    /**
     * 创建任务
     * @param quadrant
     */
    const handleClickCreate = (quadrant: string) => {
      showTaskDialog(
        {
          title: '',
          id: undefined,
          quadrant,
          status: 1,
          priority: 1,
          deadline: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          completedAt: null,
          author: ''
        },
        (options) => {
          taskList.value[options.quadrant].push(options);
        }
      );
    };
    return () => (
      <div class="desktop-task-main">
        <div class="desktop-task-main-container">
          {TaskQuadrantList.map((quadrant) => (
            <Card class="desktop-task-main-container-card">
              <div class="desktop-task-main-container-card-title">
                <span class="value">{quadrant.value}</span>
                <span class="title">{quadrant.title}</span>
              </div>
              <VueDraggable
                class="desktop-task-main-container-card-list"
                data-groupname={quadrant.value}
                v-model={taskList.value[quadrant.value]}
                animation={150}
                group="task"
                onUpdate={handleListSortEvent}
                onAdd={handleListSortEvent}
                onRemove={handleListSortEvent}
              >
                {taskList.value[quadrant.value]?.map((task) => (
                  <DesktopTaskMainTaskItem task={task} key={task.id}></DesktopTaskMainTaskItem>
                ))}
              </VueDraggable>
              <div
                class="desktop-task-main-container-card-create"
                onClick={handleClickCreate.bind(null, quadrant.value)}
              >
                <Icon type="create"></Icon>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }
});
