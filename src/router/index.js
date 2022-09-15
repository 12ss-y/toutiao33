import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'
Vue.use(VueRouter)

// SPA
// 首屏加载速度很慢
// 路由懒加载，请求的时候才会去获取dom
// - 使用到了路由页面，再去请求
const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),//懒加载
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName: "base" */ '@/views/Video')
      },
      {
        path: '/qa',
        component: () => import(/* webpackChunkName: "base" */ '@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "Search" */'@/views/Search')
  },
]

const router = new VueRouter({
  routes
})

export default router
