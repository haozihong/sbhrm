import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
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
        path: '/userinfo',
        name: 'UserInfo',
        component: UserInfo,
        hidden: true
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
