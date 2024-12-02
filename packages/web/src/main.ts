import '@xynotes/components/style.css';
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
import './services/shortcut';
import { is } from '@xynotes/utils';
import { openDevtools } from '@xynotes/app-api';

// 开发环境
if (is.development() && is.app()) {
  openDevtools(true);
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
