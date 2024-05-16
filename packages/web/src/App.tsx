import { defineComponent, onBeforeMount } from 'vue';
import './app.scss';
import middlewareHook from './middlewares';
import is from './utils/is';
import { appWindow } from '@tauri-apps/api/window';
import noteEventBus from './event-bus';
import { useNotesStore } from './store/notes.store';

const App = defineComponent({
  name: 'App',
  setup() {
    const noteStore = useNotesStore();
    const handleContextMenu = (e: Event) => {
      if (is.production()) {
        e.preventDefault();
      }
    };
    onBeforeMount(() => {
      middlewareHook.registerMiddleware('load');
      if (is.app()) {
        // 监听退出事件
        appWindow.listen('quit-event', () => {
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
