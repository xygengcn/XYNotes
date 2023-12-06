import { defineComponent } from 'vue';
import './app.scss';

const App = defineComponent({
  setup() {
    const handleContextMenu = (e: Event) => {
      // @ts-ignore
      if (process.env.NODE_ENV === 'production') {
        e.preventDefault();
      }
    };
    return () => (
      <div id="app" onContextmenu={handleContextMenu}>
        <router-view />
      </div>
    );
  }
});

export default App;
