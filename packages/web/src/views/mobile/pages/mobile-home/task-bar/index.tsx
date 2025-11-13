import { Card } from '@xynotes/components';
import { onAppSynced } from '@xynotes/store/app';
import { taskStoreAction, taskStoreState } from '@xynotes/store/task';
import { TaskQuadrantList } from '@xynotes/typings';
import { defineComponent, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import './index.scss';

export default defineComponent({
  name: 'MobileHomeTaskBar',
  setup() {
    const router = useRouter();
    const handleClick = () => {
      router.push({
        name: 'mobile-task'
      });
    };

    onActivated(() => {
      taskStoreAction.status();
    });
    onAppSynced(() => {
      taskStoreAction.status();
    });

    return () => (
      <div class="mobile-home-task-bar">
        {TaskQuadrantList.map((item) => (
          <Card class="mobile-home-task-bar-item" onClick={handleClick}>
            <span class="value">{item.value}</span>
            <span class="title">{item.title}</span>
            <span class="number">{taskStoreState.taskStatus[item.value] || 0}</span>
          </Card>
        ))}
      </div>
    );
  }
});
