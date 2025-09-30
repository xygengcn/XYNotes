import { useDrawer } from '@xynotes/components';
import { Note } from '@xynotes/store';
import { createApp, defineAsyncComponent } from 'vue';

export default function showShareNoteDialog(note: Note) {
  console.log('[showShareNoteDialog]', note);
  const instance = document.querySelector('#note-share-dialog');
  if (instance) {
    document.body.removeChild(instance);
  }
  const el = document.createElement('div');
  el.id = 'note-share-dialog';
  document.body.appendChild(el);
  const app = createApp(
    defineAsyncComponent(() => import('./dialog')),
    {
      note,
      onClose() {
        app.unmount();
        el && document.body.removeChild(el);
      }
    }
  );
  app.mount(el);
}

export function showNoteShareDrawer(note: Note) {
  console.log('[showNoteShareDrawer]', note);
  const { show } = useDrawer(
    defineAsyncComponent(() => import('./drawer')),
    { id: 'note-share-drawer', contentProps: { note } }
  );
  show();
}
