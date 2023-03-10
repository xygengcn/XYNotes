import Vue from 'vue';
import App from './App';
import { createPinia, PiniaVuePlugin } from 'pinia';
import router from './router';
import VueCompositionApi from '@vue/composition-api';
import vDebounce from './directive/debounce';
import './utils/keydown';
import Toast from '@/components/common/toast';
import Confirm from './components/common/confirm';
import './registerServiceWorker';
import VueTippy, { TippyComponent } from 'vue-tippy';
import middlewareHook from './middlewares';
import perloadDefaultMiddleware from './middlewares/preload.middleware';
import { configSaveDefautlMiddleware } from './middlewares/config.middleware';
import { deleteNoteDefaultMiddleware, saveNoteDefaultMiddleware } from './middlewares/note.middleware';

// 提示指令注册
Vue.use(VueTippy);
Vue.component('tippy', TippyComponent);

// ui赋值
window.$ui = {
  toast: Toast,
  confirm: Confirm,
};

// 注册节流
Vue.use(vDebounce);

// 注册composition
Vue.use(VueCompositionApi);

// 注册pinal
const pinia = createPinia();

// 注册中间件
middlewareHook.useMiddleware('load', perloadDefaultMiddleware());

middlewareHook.useMiddleware('saveConfig', configSaveDefautlMiddleware());

middlewareHook.useMiddleware('saveNote', saveNoteDefaultMiddleware());

middlewareHook.useMiddleware('deleteNote', deleteNoteDefaultMiddleware());

// 注册pinia
Vue.use(PiniaVuePlugin);

new Vue({
  pinia,
  router,
  render: (h) => h(App),
  created: async () => {
    middlewareHook.registerMiddleware('load');
  },
}).$mount('#app');
