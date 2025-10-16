import { useDrawer } from '@xynotes/components';
import { createApp, defineAsyncComponent } from 'vue';
import { IDaysOptions } from '../type';

export function showDaysDrawer(onSubmit: (options: IDaysOptions) => void) {
  const { show } = useDrawer(
    defineAsyncComponent(() => import('./drawer')),
    {
      id: 'markdown-editor-days-drawer',
      contentProps: {
        onSubmit: (options) => {
          options && onSubmit?.(options);
        }
      },
      drawerOptions: { height: '60vh' }
    }
  );
  show();
}

export default function showDaysDialog(onSubmit: (options: IDaysOptions) => void) {
  const instance = document.querySelector('#markdown-editor-days-dialog');
  if (instance) {
    document.body.removeChild(instance);
  }
  const el = document.createElement('div');
  el.id = 'markdown-editor-days-dialog';
  document.body.appendChild(el);
  const app = createApp(
    defineAsyncComponent(() => import('./dialog')),
    {
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
