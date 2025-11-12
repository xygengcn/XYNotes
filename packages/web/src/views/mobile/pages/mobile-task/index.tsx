import { showTaskDrawer } from '@/services/task-edit';
import { useThemeColor } from '@/services/theme';
import { Card, Icon, Nav } from '@xynotes/components';
import { taskStoreAction, taskStoreState } from '@xynotes/store/task';
import { TaskQuadrant, TaskQuadrantList, type ITaskItem } from '@xynotes/typings';
import { uuid } from '@xynotes/utils';
import { defineComponent, onBeforeMount } from 'vue';
import { VueDraggable, type SortableEvent } from 'vue-draggable-plus';
import { useRouter } from 'vue-router';
import './index.scss';
import { MobileTaskItem } from './item';

export default defineComponent({
  name: 'MobileTask',
  setup() {
    const router = useRouter();
    /**
     * 列表排序事件处理
     * @param event
     */
    const handleListSortEvent = (event: SortableEvent) => {
      switch (event.type) {
        case 'add': {
          const toGroupName = event.to.dataset.groupname as TaskQuadrant;
          const taskId = ((event as any).data as ITaskItem)?.id;
          if (taskId) {
            const task = taskStoreState.taskList[toGroupName].find((task) => task.id === taskId);
            if (task) {
              task.quadrant = toGroupName;
            }
          }
        }
      }
      taskStoreAction.orderTask();
    };
    /**
     * 创建任务
     * @param quadrant
     */
    const handleClickCreate = (quadrant: TaskQuadrant) => {
      showTaskDrawer(
        {
          title: '',
          taskId: uuid(),
          id: undefined,
          quadrant,
          status: 0,
          priority: 0,
          deadline: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          completedAt: null,
          author: ''
        },
        (task) => {
          taskStoreAction.saveTask(task);
        }
      );
    };

    onBeforeMount(() => {
      /**
       * 切换主题
       */
      useThemeColor('#fff');
      taskStoreAction.fetchTaskList();
    });
    return () => (
      <div class="mobile-task">
        <Nav
          backText="返回"
          title="四象限"
          onBack={() => {
            router.push({
              name: 'mobile-home',
              query: {
                routerType: 'push'
              }
            });
          }}
        ></Nav>
        <div class="mobile-task-container">
          {TaskQuadrantList.map((quadrant) => (
            <Card class="mobile-task-container-card">
              <div class="mobile-task-container-card-title">
                <span class="value">{quadrant.value}</span>
                <span class="title">{quadrant.title}</span>
              </div>
              <VueDraggable
                class="mobile-task-container-card-list"
                data-groupname={quadrant.value}
                v-model={taskStoreState.taskList[quadrant.value]}
                animation={150}
                group="task"
                onUpdate={handleListSortEvent}
                onAdd={handleListSortEvent}
                onRemove={handleListSortEvent}
              >
                {taskStoreState.taskList[quadrant.value]?.map((task) => (
                  <MobileTaskItem task={task} key={task.id}></MobileTaskItem>
                ))}
              </VueDraggable>
              <div
                class="mobile-task-container-card-blank"
                v-show={taskStoreState.taskList[quadrant.value]?.length === 0}
              >
                添加事项到清单吧!
              </div>
              <div class="mobile-task-container-card-create" onClick={handleClickCreate.bind(null, quadrant.value)}>
                <Icon type="create"></Icon>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }
});
