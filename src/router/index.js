import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const isMobie = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
const routes = [{
    path: '/',
    component: () => import('../views/Home'),
    children: [{
      path: '/',
      component: () => import('../views/ListView')
    },  {
      path: 'note',
      component: () => import('../views/ListView')
    },{
      path: 'mark',
      name: 'Mark',
      component: () => import('../views/MarkView')
    }, {
      path: 'backup',
      name: 'Backup',
      component: () => import('../views/Backup')
    }, {
      path: 'setting',
      name: 'Setting',
      component: () => import('../views/Setting')
    }]
  },
  {
    path: '/m',
    name: 'Mobile',
    component: () => import('../views/Home'),
    children: [{
      path: '/',
      component: () => import('../views/ListView')
    }, {
      path: 'note',
      component: () => import('../views/TextContainer')
    },
    {
      path: 'mark',
      name: 'Mark',
      component: () => import('../views/MarkView')
    }, {
      path: 'backup',
      name: 'Backup',
      component: () => import('../views/Backup')
    }, {
      path: 'setting',
      name: 'Setting',
      component: () => import('../views/Setting')
    }]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
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