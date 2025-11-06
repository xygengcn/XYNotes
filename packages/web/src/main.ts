import { openDevtools } from '@xynotes/app-api';
import { VueContextMenu } from '@xynotes/components';
import '@xynotes/components/style.css';
import { is } from '@xynotes/utils';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import { createApp } from 'vue';
import VueTippy from 'vue-tippy';
import App from './App';
import './components/index';
import './registerServiceWorker';
import router from './router';
import './services/shortcut';

// 开发环境
if (is.development() && is.app()) {
  openDevtools(true);
}

// 创建
const app = createApp(App);

// 右键
app.use(VueContextMenu);

// 指令
if (is.desktop()) {
  app.use(VueTippy, {
    directive: 'tippy'
  });
} else {
  // pad端不需要这个
  app.directive('tippy', {});
}

// 路由
app.use(router);

// 挂载
app.mount('#app');
