import Vue from 'vue'
import './plugins/vuetify'
import './plugins/axios'
import App from '@/App.vue'
import router from "./router/"
import store from "./store/"
//import "./registerServiceWorker";

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'font-awesome/css/font-awesome.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
function (...arg:any) {
    "use strict";
    var str = this.toString();
    if (arg.length) {
        var t = typeof arg[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arg)
            : arg[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};