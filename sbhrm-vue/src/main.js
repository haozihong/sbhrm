import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.use(VueAxios, axios)

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentUser: null
  },
  mutations: {
    login(state, user){
      state.currentUser = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout(state){
      state.currentUser = null;
      localStorage.removeItem('user');
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    if (localStorage.getItem('user')) {
      next();
    } else {
      next('/login?redirect=' + to.path);
    }
  }
})

new Vue({
  router,
  store,
  mounted() {
    if (localStorage.getItem('user')) {
      try {
        store.commit('login', JSON.parse(localStorage.getItem('user')));
      } catch(e) {
        store.commit('logout');
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
