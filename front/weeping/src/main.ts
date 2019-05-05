import Vue from 'vue'
import './plugins/vuetify'
import './plugins/axios'
import App from './application/App.vue'
import router from './router/'
import store from "./store/"
//import "./registerServiceWorker";
import './plugins/sockets'
import './plugins/loggers'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'font-awesome/css/font-awesome.css'
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


