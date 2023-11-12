/* eslint-disable no-console */
import { register } from 'register-service-worker';
function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
if (process.env.NODE_ENV === 'production') {
  register(`sw.js`, {
    ready() {
      console.log('正在加载离线缓存...');
    },
    registered() {
      console.log('程序已加载，正常使用');
    },
    cached() {
      console.log('已脱机缓存');
    },
    updatefound() {
      console.log('正在官网加载新版本...');
      window.$ui?.toast('新版已准备好，请刷新后使用！');
    },
    updated() {
      console.log('新版已准备好，请刷新后使用！');
    },
    offline() {
      console.log('应用程序正在脱机模式下运行...');
    },
    error(error) {
      unregister();
      console.error('注册时出错：', error);
    },
  });
}
