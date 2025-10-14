import { syncApp } from '@xynotes/store/app';
import { is } from '@xynotes/utils';
import { defineComponent, onBeforeMount } from 'vue';
import './app.scss';
import { autoRegisterAppShortcut } from './services/shortcut';

const App = defineComponent({
  name: 'App',
  setup() {
    onBeforeMount(async () => {
      // 同步数据
      syncApp().then(() => {
        autoRegisterAppShortcut();
      });
    });

    return () => (
      <div class={{ web: true, app: is.app() }}>
        <router-view />
      </div>
    );
  }
});

export default App;
