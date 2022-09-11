import Vue from 'vue';
import VueRouter, { RouteConfig, RawLocation } from 'vue-router';
import { getDeviceType } from 'js-lark';
// 解决同个路由点击多次报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location: RawLocation) {
  return (originalPush.call(this, location) as any).catch((e: any) => e);
};
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () => import('../views/desktop'),
    children: [
      {
        path: '/',
        name: 'desktop-list',
        components: {
          side: () => import('@/views/desktop/side-container/pages/side-container-list'),
          main: () => import('@/views/desktop/main-container/pages/main-container-default'),
        },
        meta: {
          device: 'desktop',
        },
      },
      {
        path: 'setting',
        name: 'desktop-setting',
        components: {
          side: () => import('@/views/desktop/side-container/pages/side-container-setting'),
          main: () => import('@/views/desktop/main-container/pages/main-container-default'),
        },
        meta: {
          device: 'desktop',
        },
      },
      {
        path: 'recycle',
        name: 'desktop-recycle',
        components: {
          side: () => import('@/views/desktop/side-container/pages/side-container-recycle'),
          main: () => import('@/views/desktop/main-container/pages/main-container-default'),
        },
        meta: {
          device: 'desktop',
        },
      },
    ],
    meta: {
      device: 'desktop',
    },
  },
  {
    path: '/m',
    component: () => import(/* webpackChunkName: "about" */ '@/views/mobile'),
    children: [
      {
        path: '/',
        name: 'mobile-home',
        component: () => import('@/views/mobile/pages/mobile-home'),
        meta: {
          keepAlive: true, // 需要被缓存
          device: 'mobile',
        },
      },
      {
        path: 'detail/:nid',
        name: 'mobile-detail',
        component: () => import('@/views/mobile/pages/mobile-detail'),
        meta: {
          device: 'mobile',
        },
      },
    ],
    meta: {
      device: 'mobile',
    },
  },
];

const router = new VueRouter({
  routes,
  mode: 'hash',
});
router.beforeEach((to, from, next) => {
  if (to.meta?.device == 'desktop') {
    if (getDeviceType() === 'mobile') {
      return next({ name: 'mobile-home' });
    }
    if (getDeviceType() === 'tablet' && Math.abs(Number(window.orientation)) !== 90) {
      return next({ name: 'mobile-home' });
    }
  }
  if (to.meta?.device == 'mobile') {
    if (getDeviceType() === 'desktop') {
      return next({ name: 'desktop-list' });
    }
    if (getDeviceType() === 'tablet' && Math.abs(Number(window.orientation)) === 90) {
      return next({ name: 'desktop-list' });
    }
  }
  next();
});

export default router;
