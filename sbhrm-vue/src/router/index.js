import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HrList from "@/views/HrList";
import Login from "@/views/Login";
import UserInfo from "@/views/UserInfo";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: true
  },
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
      {
        path: '/userinfo',
        name: 'UserInfo',
        component: UserInfo,
        hidden: true
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
