import { syncApp } from '@xynotes/store/app';
import { notesStoreState, updateNote } from '@xynotes/store/note';
import { is } from '@xynotes/utils';
import { defineComponent, onBeforeMount } from 'vue';
import './app.scss';
import noteEventBus from './services/event-bus';

const App = defineComponent({
  name: 'App',
  setup() {
    const handleContextMenu = (e: Event) => {
      if (is.production()) {
        e.preventDefault();
      }
    };
    onBeforeMount(async () => {
      // 同步数据
      syncApp();
      if (is.app()) {
        // 监听其他事件
        noteEventBus.on('note:update', (content) => {
          if (content.action === 'update') {
            if (is.mainWindow()) {
              updateNote(content.note);
              return;
            }
            if (notesStoreState.value.activeNoteId === content.note.nid) {
              updateNote(content.note);
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
