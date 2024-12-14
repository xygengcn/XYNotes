import { VueContextMenu } from '@xynotes/components';
import { Note } from '@xynotes/store';
import { createApp, defineAsyncComponent } from 'vue';
import './index.scss';

interface IScreenshotProps {
  width?: string;
  height?: string;
}

export default function showShareNoteDialog(note: Note, options: IScreenshotProps = {}) {
  console.log('[showShareNoteDialog]', note, options);
  const instance = document.querySelector('#screenshot');
  if (instance) {
    document.body.removeChild(instance);
  }
  const el = document.createElement('div');
  el.id = 'screenshot';
  document.body.appendChild(el);
  const app = createApp(
    defineAsyncComponent(() => import('./screenshot')),
    {
      note,
      ...options,
      onClose() {
        app.unmount();
        el && document.body.removeChild(el);
      }
    }
  );
  app.use(VueContextMenu).mount(el);
}
