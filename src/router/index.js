import Vue from 'vue'
import VueRouter from 'vue-router'

import plugins from "@/plugins/index.js";

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: () => import('@/views/App'),
    children: [{
      path: '/',
      component: () => import('@/views/ListView')
    },  {
      path: 'note',
      component: () => import('@/views/ListView')
    },{
      path: 'mark',
      component: () => import('@/views/MarkView')
    }, {
      path: 'setting',
      component: () => import('@/views/SettingView')
    }, {
      path: 'plugins',
      component: () => import('@/views/PluginsView')
    }]
  },
  {
    path: '/m',
    component: () => import('@/views/App'),
    children: [{
      path: '/',
      component: () => import('@/views/ListView')
    }, {
      path: 'note',
      component: () => import('@/views/TextContainer')
    },
    {
      path: 'mark',
      component: () => import('@/views/MarkView')
    },  {
      path: 'setting',
      component: () => import('@/views/SettingView')
    },{
      path: 'plugins',
      component: () => import('@/views/PluginsView')
    }]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from,next) => {
  plugins.hook("beforeEach",[to,from,next,routes]);
  const isMobie = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
  if (isMobie) {
    if (to.path.substring(0, 3) == '/m/' || to.path=="/m") {
      next();
    } else {
      next({
        path:'/m' + to.fullPath
      });
    }
  } else {
    if(to.path!="/m" && to.path.substring(0, 3) != '/m/'){
      next();
    }else{
      if(to.path == "/m" && to.path == "/m/"){
        next({
          path:'/'
        })
      }else{
        next({
          path:to.fullPath.substr(2,to.fullPath.length)
        });
      }
    }
  }
 
});

export default router