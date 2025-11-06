import { AppMode } from '@xynotes/store';
import { appStoreState } from '@xynotes/store/app';
import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/desktop'),
    children: [
      {
        path: '/',
        name: 'desktop-main',
        meta: {
          device: 'desktop'
        },
        children: [
          {
            path: '',
            name: 'desktop-main-default',
            components: {
              side: () => import('@/views/desktop/pages/list/side'),
              main: () => import('@/views/desktop/contianer/main/default')
            }
          },
          {
            path: 'detail/:nid',
            name: 'desktop-main-detail',
            components: {
              side: () => import('@/views/desktop/pages/list/side'),
              main: () => import('@/views/desktop/pages/list/main/detail')
            }
          }
        ]
      },
      {
        path: 'setting',
        name: 'desktop-setting',
        meta: {
          device: 'desktop'
        },
        children: [
          {
            path: '',
            name: 'desktop-setting-default',
            components: {
              side: () => import('@/views/desktop/pages/settings/side'),
              main: () => import('@/views/desktop/contianer/main/default')
            }
          },
          {
            path: 'config',
            name: 'desktop-setting-config',
            components: {
              side: () => import('@/views/desktop/pages/settings/side'),
              main: () => import('@/views/desktop/pages/settings/main')
            }
          }
        ]
      },
      {
        path: 'archive',
        name: 'desktop-archive',
        meta: {
          device: 'desktop'
        },
        children: [
          {
            path: '',
            name: 'desktop-archive-default',
            components: {
              side: () => import('@/views/desktop/pages/archive/side'),
              main: () => import('@/views/desktop/pages/archive/main')
            }
          },
          {
            path: 'preview/:nid',
            name: 'desktop-archive-preview',
            components: {
              side: () => import('@/views/desktop/pages/archive/side'),
              main: () => import('@/views/desktop/pages/archive/main')
            }
          }
        ]
      }
    ],
    meta: {
      device: 'desktop'
    }
  },
  {
    path: '/edit/:nid',
    component: () => import('@/views/desktop/pages/edit')
  },
  {
    path: '/m',
    component: () => import('@/views/mobile'),
    children: [
      {
        path: '/',
        name: 'mobile-home',
        component: () => import('@/views/mobile/pages/mobile-home'),
        meta: {
          keepAlive: true, // 需要被缓存
          device: 'mobile',
          index: 0
        }
      },
      {
        path: 'detail/:nid',
        name: 'mobile-detail',
        component: () => import('@/views/mobile/pages/mobile-detail'),
        meta: {
          device: 'mobile',
          index: 1
        }
      },
      {
        path: 'setting',
        name: 'mobile-setting',
        component: () => import('@/views/mobile/pages/mobile-setting'),
        meta: {
          device: 'mobile',
          index: 1
        }
      }
    ],
    meta: {
      device: 'mobile'
    }
  }
];

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});
router.beforeEach((to, _from, next) => {
  console.log('desktop', to.meta?.device, appStoreState.value.mode);
  if (to.meta?.device == 'desktop') {
    if (appStoreState.value.mode == AppMode.mobile) {
      return next({ name: 'mobile-home' });
    }
  }
  if (to.meta?.device == 'mobile') {
    if (appStoreState.value.mode == AppMode.desktop) {
      return next({ name: 'desktop-main' });
    }
  }
  next();
});

export default router;
