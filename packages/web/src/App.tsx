import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { defineComponent, onBeforeMount } from 'vue';
import './app.scss';
import noteEventBus from './event-bus';
import middlewareHook from './middlewares';
import { useNotesStore } from './store/notes.store';
import is from './utils/is';

const App = defineComponent({
  name: 'App',
  setup() {
    const noteStore = useNotesStore();
    const handleContextMenu = (e: Event) => {
      if (is.production()) {
        e.preventDefault();
      }
    };
    onBeforeMount(async () => {
      middlewareHook.registerMiddleware('sync');
      if (is.app()) {
        const appWindow = WebviewWindow.getCurrent();
        // 监听退出事件
        appWindow.listen('quit-event', () => {
          console.log('[app] quit-event');
          appWindow.close();
        });
        // 监听其他事件
        noteEventBus.on('update', (content) => {
          if (content.action === 'update') {
            if (is.mainWindow()) {
              noteStore.updateNote(content.note);
              return;
            }
            if (noteStore.activeNoteId === content.note.nid) {
              noteStore.updateNote(content.note);
            }
          }
        });
      }
    });

    return () => (
      <div class={{ web: true, app: is.app() }} onContextmenu={handleContextMenu}>
        <router-view />
      </div>
    );
  }
});

export default App;
