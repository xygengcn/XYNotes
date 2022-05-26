import Vue from 'vue';
import App from './App';
import { createPinia, PiniaVuePlugin } from 'pinia';
import router from './router';
import perload from './store/preload';
import VueCompositionApi from '@vue/composition-api';
import vDebounce from './directive/debounce';
import './utils/keydown';
Vue.use(vDebounce);
Vue.use(VueCompositionApi);
const pinia = createPinia();

Vue.use(PiniaVuePlugin);
new Vue({
  pinia,
  router,
  render: (h) => h(App),
  created: () => {
    perload();
  },
}).$mount('#app');
