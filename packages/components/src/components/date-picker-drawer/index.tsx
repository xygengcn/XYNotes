import { createApp, defineAsyncComponent } from 'vue';
import { useDrawer } from '../drawer';
import { DatePickerOptions, DatePickerResult } from './content';

export const showDatePickerDrawer = (options?: DatePickerOptions) => {
  const defaultOptions = {
    initialDate: new Date(),
    onConfirm: () => {},
    onCancel: () => {}
  };

  const finalOptions = { ...defaultOptions, ...options };
  const { show } = useDrawer(
    defineAsyncComponent(() => import('./content')),
    {
      id: 'date-picker-drawer-instance',
      contentProps: {
        initialDate: finalOptions.initialDate,
        onConfirm: (result: DatePickerResult) => {
          finalOptions.onConfirm(result);
        },
        onClose: () => {
          finalOptions.onCancel();
        }
      },
      drawerOptions: { height: '50vh' }
    }
  );
  show();
};

export function showDatePickerDialog(options?: DatePickerOptions) {
  const defaultOptions = {
    initialDate: new Date(),
    onConfirm: () => {},
    onCancel: () => {}
  };

  const finalOptions = { ...defaultOptions, ...options };
  const instance = document.querySelector('#date-picker-dialog-instance');
  if (instance) {
    document.body.removeChild(instance);
  }
  const el = document.createElement('div');
  el.id = 'date-picker-dialog-instance';
  document.body.appendChild(el);
  const app = createApp(
    defineAsyncComponent(() => import('./dialog')),
    {
      initialDate: finalOptions.initialDate,
      onConfirm: (result: DatePickerResult) => {
        finalOptions.onConfirm(result);
      },
      onClose: () => {
        finalOptions.onCancel();
        app.unmount();
        if (document.body.contains(el)) {
          el && document.body.removeChild(el);
        }
      }
    }
  );
  app.mount(el);
}
