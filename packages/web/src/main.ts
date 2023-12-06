import Toast from '@/components/common/toast';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import VueTippy from 'vue-tippy';
import 'tippy.js/dist/tippy.css';
import App from './App';
import Confirm from './components/common/confirm';
import VueDebounce from './directive/debounce';
import middlewareHook from './middlewares';
import { configSaveDefautlMiddleware } from './middlewares/config.middleware';
import { deleteNoteDefaultMiddleware, saveNoteDefaultMiddleware } from './middlewares/note.middleware';
import perloadDefaultMiddleware from './middlewares/preload.middleware';
import './preload';
import './registerServiceWorker';
import router from './router';
import './shortcut';
import VueLongPress from './directive/long-press';

// @ts-ignore
if (process.env.NODE_ENV === 'development') {
  window.__TAURI__ && window.openDevtools();
}

// ui赋值
window.$ui = {
  toast: Toast,
  confirm: Confirm
};

// 注册中间件
middlewareHook.useMiddleware('load', perloadDefaultMiddleware());

middlewareHook.useMiddleware('saveConfig', configSaveDefautlMiddleware());

middlewareHook.useMiddleware('saveNote', saveNoteDefaultMiddleware());

middlewareHook.useMiddleware('deleteNote', deleteNoteDefaultMiddleware());

middlewareHook.useMiddleware('recovery', perloadDefaultMiddleware());

// 注册pinia
const pinia = createPinia();

const app = createApp(App);
// 注册pinia
app.use(pinia);

app.use(VueDebounce);

app.use(VueLongPress);

// 指令
app.use(VueTippy, {
  directive: 'tippy' // => v-tippy
});

app.use(router);

app.mount('#app');
