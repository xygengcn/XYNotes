import { syncApp } from '@xynotes/store/app';
import { is } from '@xynotes/utils';
import { defineComponent, onBeforeMount } from 'vue';
import './app.scss';
import { autoRegisterAppShortcut } from './services/shortcut';

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
      syncApp().then(() => {
        autoRegisterAppShortcut();
      });
    });

    return () => (
      <div class={{ web: true, app: is.app() }} onContextmenu={handleContextMenu}>
        <router-view />
      </div>
    );
  }
});

export default App;
