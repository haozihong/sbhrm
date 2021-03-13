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
    currentUser: {
      name: '',
      avatar: ''
    }
  },
  mutations: {
    setCurrentUser(state, user){
      state.currentUser = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearCurrentUser(state){
      state.currentUser = { name: '', avatar: '' };
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

// handle all errors here
axios.interceptors.response.use(success => {
  if (success.status && success.status === 200 && success.data.status === 500) {
    ElementUI.Message.error({message: success.data.msg})
  } else if (success.data.msg) {
    ElementUI.Message.success({message: success.data.msg})
  }
  return success.data;
}, error => {
  if (error.response.status === 401) {
    ElementUI.Message.error({message: error.response.data.msg ? error.response.data.msg : 'Please log in.'})
    router.replace('/login');
  } else {
    if (error.response.data.msg) {
      ElementUI.Message.error({message: error.response.data.msg})
    } else {
      ElementUI.Message.error({ message: `${error.response.status}: ${error.response.statusText}` })
    }
  }
  return;
})

new Vue({
  router,
  store,
  mounted() {
    if (localStorage.getItem('user')) {
      try {
        store.commit('setCurrentUser', JSON.parse(localStorage.getItem('user')));
      } catch(e) {
        store.commit('clearCurrentUser');
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
