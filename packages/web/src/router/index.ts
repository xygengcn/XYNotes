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
            name: 'desktop-main-list',
            component: () => import('@/views/desktop/pages/list'),
            children: [
              {
                path: '',
                name: 'desktop-main-list-default',
                component: () => import('@/views/desktop/container/main/default')
              },
              {
                path: 'detail/:nid',
                name: 'desktop-main-list-detail',
                component: () => import('@/views/desktop/pages/list/main')
              }
            ]
          }
        ]
      },
      {
        path: 'setting',
        name: 'desktop-setting',
        component: () => import('@/views/desktop/pages/settings'),
        meta: {
          device: 'desktop'
        },
        children: [
          {
            path: '',
            name: 'desktop-setting-default',
            component: () => import('@/views/desktop/container/main/default')
          },
          {
            path: 'config',
            name: 'desktop-setting-config',
            component: () => import('@/views/desktop/pages/settings/main')
          }
        ]
      },
      {
        path: 'archive',
        name: 'desktop-archive',
        meta: {
          device: 'desktop'
        },
        component: () => import('@/views/desktop/pages/archive'),
        children: [
          {
            path: '',
            name: 'desktop-archive-default',
            component: () => import('@/views/desktop/container/main/default')
          },
          {
            path: 'preview/:nid',
            name: 'desktop-archive-preview',
            component: () => import('@/views/desktop/pages/archive/main')
          }
        ]
      },
      {
        path: 'edit/:nid',
        name: 'desktop-edit',
        meta: {
          device: 'desktop'
        },
        component: () => import('@/views/desktop/pages/edit')
      },
      {
        path: 'task',
        name: 'desktop-task',
        meta: {
          device: 'desktop'
        },
        component: () => import('@/views/desktop/pages/task'),
        children: [
          {
            path: '',
            name: 'desktop-task-default',
            component: () => import('@/views/desktop/pages/task/main')
          }
        ]
      }
    ],
    meta: {
      device: 'desktop'
    }
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
