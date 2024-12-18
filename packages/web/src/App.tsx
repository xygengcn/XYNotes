import { defineComponent, onBeforeMount } from 'vue';
import './app.scss';
import noteEventBus from './services/event-bus';
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
        // 监听其他事件
        noteEventBus.on('note:update', (content) => {
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
