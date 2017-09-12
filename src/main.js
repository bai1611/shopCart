// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import VUeResource from 'vue-resource'
import store from './store/index.js'

// require('../../common/css/icon.css')
// import goods from '../components/goods/goods'
Vue.use(VUeResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


