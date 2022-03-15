import Vue from 'vue'
import VueRouter from 'vue-router'
import plugins from "@/plugins/index.js"

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: () => import('@/pages/desktop/'),
        children: [{
            path: '/',
            name: "desktop-home",
            component: () => import('@/components/mainbar/notes/')

        }, {
            path: 'note',
            name: "desktop-note",
            component: () => import('@/components/mainbar/notes/')
        }, {
            path: 'mark',
            name: "desktop-mark",
            component: () => import('@/components/mainbar/mark/')
        }, {
            path: 'setting',
            name: "desktop-setting",
            component: () => import('@/components/mainbar/setting/')
        }, {
            path: 'about',
            name: "desktop-about",
            component: () => import('@/components/mainbar/setting/about/')
        }, {
            path: 'plugins',
            name: "desktop-plugins",
            component: () => import('@/components/mainbar/plugins/')
        }]
    },
    {
        path: '/m',
        component: () => import('@/pages/mobie'),
        children: [{
                path: 'note',
                name: "mobie-note",
                component: () => import('@/pages/mobie/note')
            },
            {
                path: '/',
                component: () => import('@/pages/mobie/page/'),
                children: [{
                        path: '/',
                        name: "mobie-home",
                        component: () => import('@/components/mainbar/notes/')
                    }, {
                        path: 'mark',
                        name: "mobie-mark",
                        component: () => import('@/components/mainbar/mark/')
                    }, {
                        path: 'setting',
                        name: "mobie-setting",
                        component: () => import('@/components/mainbar/setting/')
                    },
                    {
                        path: 'about',
                        name: "mobie-about",
                        component: () => import('@/components/mainbar/setting/about/')
                    }, {
                        path: 'plugins',
                        name: "mobie-plugins",
                        component: () => import('@/components/mainbar/plugins/')
                    }
                ]
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
    var isMobie = false;
    if (document.body.clientWidth < 1024) {
        isMobie = true;
    }
    if (isMobie) {
        if (to.name.indexOf('desktop') == -1) {
            next();
        } else {
            next({
                name: to.name.replace('desktop', 'mobie')
            });
        }
    } else {
        if (to.name.indexOf('mobie') == -1) {
            next();
        } else {
            next({
                name: to.name.replace('mobie', 'desktop')
            });
        }

    }
    plugins.hook("beforeEach", [to, from]);

});

router.afterEach(function(to, from) {
    plugins.hook("afterEach", [to, from]);
})

export default router