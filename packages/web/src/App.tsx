import { syncApp } from '@xynotes/store/app';
import { is } from '@xynotes/utils';
import { defineComponent, onBeforeMount } from 'vue';
import './app.scss';

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
    });

    return () => (
      <div class={{ web: true, app: is.app() }} onContextmenu={handleContextMenu}>
        <router-view />
      </div>
    );
  }
});

export default App;
