import { useDrawer } from '@xynotes/components';
import type { ITaskItem } from '@xynotes/typings';
import { createApp, defineAsyncComponent } from 'vue';

export function showTaskDrawer(task: ITaskItem, onSubmit: (options: ITaskItem) => void, onDelete?: () => void) {
  const { show } = useDrawer(
    defineAsyncComponent(() => import('./drawer')),
    {
      id: 'task-drawer',
      contentProps: {
        task,
        onSubmit: (options) => {
          options && onSubmit?.(options);
        },
        onDelete: () => {
          onDelete?.();
        }
      },
      drawerOptions: { height: '60vh' }
    }
  );
  show();
}

export default function showTaskDialog(task: ITaskItem, onSubmit: (options: ITaskItem) => void) {
  const instance = document.querySelector('#task-dialog');
  if (instance) {
    document.body.removeChild(instance);
  }
  const el = document.createElement('div');
  el.id = 'task-dialog';
  document.body.appendChild(el);
  const app = createApp(
    defineAsyncComponent(() => import('./dialog')),
    {
      task,
      onSubmit: (options) => {
        options && onSubmit?.(options);
      },
      onClose() {
        app.unmount();
        if (document.body.contains(el)) {
          el && document.body.removeChild(el);
        }
      }
    }
  );
  app.mount(el);
}
