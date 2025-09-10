/* eslint-disable no-console */
import { is } from '@xynotes/utils';
import { register } from 'register-service-worker';

// @ts-ignore
if (process.env.NODE_ENV === 'production' && !is.app()) {
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
    },
    updated() {
      window.$ui?.toast('新版已准备好，即将刷新！');
      setTimeout(() => {
        window.location.reload();
      }, 800);
      console.log('新版已准备好，请刷新后使用！');
    },
    offline() {
      console.log('应用程序正在脱机模式下运行...');
    },
    error(error) {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister();
        });
      }
      console.error('注册时出错：', error);
    }
  });
}
