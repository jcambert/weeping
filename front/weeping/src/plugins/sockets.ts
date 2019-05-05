import Vue from 'vue'
import {SocketPlugin, SocketPluginOptions} from './socket'
import app from '@/api/app'
var opt:SocketPluginOptions={
    uri:app.socket.url,
    debug:true
}
Vue.use(SocketPlugin,opt)
