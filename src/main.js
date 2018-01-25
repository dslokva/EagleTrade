// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import i18n from './i18n'
import mainStore from './utils/store'
import VueNativeSock from 'vue-native-websocket'

Vue.use(VueNativeSock, 'ws://127.0.0.1:40510/ws', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
  store: mainStore
  // format: 'json'
})
Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store: mainStore,
  router,
  template: '<App/>',
  components: {
    App
  }
})
