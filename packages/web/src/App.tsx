import { defineComponent, onBeforeMount } from 'vue';
import './app.scss';
import middlewareHook from './middlewares';

const App = defineComponent({
  name: 'App',
  setup() {
    const handleContextMenu = (e: Event) => {
      // @ts-ignore
      if (process.env.NODE_ENV === 'production') {
        e.preventDefault();
      }
    };
    onBeforeMount(() => {
      middlewareHook.registerMiddleware('load');
    });
    return () => (
      <div class={{ web: true, app: window.__TAURI__ }} onContextmenu={handleContextMenu}>
        <router-view />
      </div>
    );
  }
});

export default App;
