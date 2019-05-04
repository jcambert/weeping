import Vue from 'vue'
import './plugins/vuetify'
import './plugins/axios'
import App from '@/application/App.vue'
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


String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
function (this:string,...arg:any):string {
    "use strict";
    var str:string = this;//(this as String).toString();
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

String.prototype.capitalize = String.prototype.capitalize ||
function(this:string){
    return this.charAt(0).toUpperCase() + this.slice(1)
}