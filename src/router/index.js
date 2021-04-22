import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const business = () => import('../views/business')
const evaluate = () => import('../views/evaluate')
const goods = () => import('../views/goods')

const routes = [
  {
    path: '/',
    redirect: '/goods',
  },
  {
    path: '/goods',
    component: goods,
  },
  {
    path: '/evaluate',
    component: evaluate,
  },
  {
    path: '/business',
    component: business
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'class'
})

export default router
