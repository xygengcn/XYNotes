import { defineComponent, onBeforeMount } from 'vue';
import './app.scss';
import middlewareHook from './middlewares';
import is from './utils/is';
import { appWindow } from '@tauri-apps/api/window';

const App = defineComponent({
  name: 'App',
  setup() {
    const handleContextMenu = (e: Event) => {
      if (is.isProduction()) {
        e.preventDefault();
      }
    };
    onBeforeMount(() => {
      middlewareHook.registerMiddleware('load');
      if (is.app()) {
        appWindow.listen('quit-event', () => {
          appWindow.close();
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
