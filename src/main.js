// Import Scripts
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import { chessboard } from 'vue-chessboard'
// Import CSS
import 'vue-chessboard/dist/vue-chessboard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Components
Vue.use(BootstrapVue)

Vue.component('chessboard', chessboard)

// configure production help
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
