import { useDrawer } from '@xynotes/components';
import { Note } from '@xynotes/store';
import { createApp, defineAsyncComponent } from 'vue';

export function showNoteTagsDrawer(note: Note) {
  console.log('[showNoteTagsDrawer]');
  const { show } = useDrawer(
    defineAsyncComponent(() => import('./drawer')),
    { id: 'note-tags-drawer', contentProps: { note }, drawerOptions: { height: '60vh' } }
  );
  show();
}

export default function showNoteTagsDialog(note: Note) {
  console.log('[showNoteTagsDialog]', note);
  const instance = document.querySelector('#NoteTags');
  if (instance) {
    document.body.removeChild(instance);
  }
  const el = document.createElement('div');
  el.id = 'NoteTags';
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
