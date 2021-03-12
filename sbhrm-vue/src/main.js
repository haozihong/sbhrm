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

  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
