import { getDeviceType } from 'js-lark';
import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/desktop'),
    children: [
      {
        path: '/',
        name: 'desktop-list',
        components: {
          side: () => import('@/views/desktop/side-container/pages/side-container-list'),
          main: () => import('@/views/desktop/main-container/pages/main-container-default')
        },
        meta: {
          device: 'desktop'
        }
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
              side: () => import('@/views/desktop/side-container/pages/side-container-setting'),
              main: () => import('@/views/desktop/main-container/pages/main-container-default')
            }
          },
          {
            path: 'config',
            name: 'desktop-setting-config',
            components: {
              side: () => import('@/views/desktop/side-container/pages/side-container-setting'),
              main: () => import('@/views/desktop/main-container/pages/main-container-config')
            }
          }
        ]
      },
      {
        path: 'recycle',
        name: 'desktop-recycle',
        components: {
          side: () => import('@/views/desktop/side-container/pages/side-container-recycle'),
          main: () => import('@/views/desktop/main-container/pages/main-container-default')
        },
        meta: {
          device: 'desktop'
        }
      }
    ],
    meta: {
      device: 'desktop'
    }
  },
  {
    path: '/detail',
    component: () => import('@/views/detail-page')
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
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
