import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HrList from "@/views/HrList";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: '/hr/list',
        name: 'All HR',
        component: HrList
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
