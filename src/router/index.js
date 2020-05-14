import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import('../views/ListView')
}, {
  path: '/mark',
  name: 'Mark',
  component: () => import('../views/MarkView')
}, {
  path: '/backup',
  name: 'Backup',
  component: () => import('../views/Backup')
} ,{
  path: '/setting',
  name: 'Setting',
  component: () => import('../views/Setting')
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router