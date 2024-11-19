import middlewareHook from '@/middlewares';
import { configSaveDefautlMiddleware } from '@/middlewares/config.middleware';
import { deleteNoteDefaultMiddleware, saveNoteDefaultMiddleware } from '@/middlewares/note.middleware';
import perloadDefaultMiddleware from '@/middlewares/preload.middleware';
import 'overlayscrollbars/overlayscrollbars.css';
import { createPinia } from 'pinia';
import 'tippy.js/dist/tippy.css';
import { createApp } from 'vue';
import VueTippy from 'vue-tippy';
import App from './App';
import './components/index';
import VueContextMenu from './directive/contextmenu';
import './registerServiceWorker';
import router from './router';
import './services/app-window';
import './services/shortcut';
import is from './utils/is';
import "@xynotes/components/lib/style.css"

/**
 * 注册中间件
 */
middlewareHook.useMiddleware('sync', perloadDefaultMiddleware());

middlewareHook.useMiddleware('saveConfig', configSaveDefautlMiddleware());

middlewareHook.useMiddleware('saveNote', saveNoteDefaultMiddleware());

middlewareHook.useMiddleware('deleteNote', deleteNoteDefaultMiddleware());

middlewareHook.useMiddleware('recovery', perloadDefaultMiddleware());

// 开发环境
if (is.development()) {
  window.$appWindow.openDevtools(true);
}

// 注册pinia
const pinia = createPinia();

const app = createApp(App);
// 注册pinia
app.use(pinia);

app.use(VueContextMenu);

// 指令
app.use(VueTippy, {
  directive: 'tippy'
});

app.use(router);

app.mount('#app');
