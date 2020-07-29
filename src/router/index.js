import Vue from 'vue'
import VueRouter from 'vue-router'

import plugins from "@/plugins/index.js";

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: () => import('@/views/App'),
        children: [{
            path: '/',
            component: () => import('@/components/mainbar/notes/Home')
        }, {
            path: 'note',
            component: () => import('@/components/mainbar/notes/Home')
        }, {
            path: 'mark',
            component: () => import('@/components/mainbar/mark/Home')
        }, {
            path: 'setting',
            component: () => import('@/components/mainbar/setting/Home')
        }, {
            path: 'about',
            component: () => import('@/components/mainbar/setting/about/Home')
        }, {
            path: 'plugins',
            component: () => import('@/components/mainbar/plugins/Home')
        }, {
            path: 'plugins/:id',
            component: () => import('@/components/mainbar/plugins/Page')
        }, {
            path: 'plugins/:id/:name',
            component: () => import('@/components/mainbar/plugins/Page')
        }]
    },
    {
        path: '/m',
        component: () => import('@/views/App'),
        children: [{
                path: '/',
                component: () => import('@/components/mainbar/notes/Home')
            }, {
                path: 'note',
                component: () => import('@/components/main/Home')
            },
            {
                path: 'mark',
                component: () => import('@/components/mainbar/mark/Home')
            }, {
                path: 'setting',
                component: () => import('@/components/mainbar/setting/Home')
            }, {
                path: 'about',
                component: () => import('@/components/mainbar/setting/about/Home')
            }, {
                path: 'plugins',
                component: () => import('@/components/mainbar/plugins/Home')
            }, {
                path: 'plugins/:id',
                component: () => import('@/components/mainbar/plugins/Page')
            }, {
                path: 'plugins/:id/:name',
                component: () => import('@/components/mainbar/plugins/Page')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const isMobie = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    if (isMobie) {
        if (to.path.substring(0, 3) == '/m/' || to.path == "/m") {
            next();
        } else {
            next({
                path: '/m' + to.fullPath
            });
        }
    } else {
        if (to.path != "/m" && to.path.substring(0, 3) != '/m/') {
            next();
        } else {
            if (to.path == "/m" && to.path == "/m/") {
                next({
                    path: '/'
                })
            } else {
                next({
                    path: to.fullPath.substr(2, to.fullPath.length)
                });
            }
        }
    }
    plugins.hook("beforeEach", [to, from]);

});

router.afterEach(function(to, from) {
    plugins.hook("afterEach", [to, from]);
})

export default router