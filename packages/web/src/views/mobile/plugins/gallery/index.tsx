import { useDrawer } from '@xynotes/components';
import { defineAsyncComponent } from 'vue';

export function showNoteGalleryDrawer() {
  console.log('[showNoteGalleryDrawer]');
  const { show } = useDrawer(
    defineAsyncComponent(() => import('./drawer')),
    {
      id: 'note-gallery-drawer',
      drawerOptions: { height: '90vh' }
    }
  );
  show();
}
