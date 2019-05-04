import Vue from 'vue'
import {SocketPlugin, SocketPluginOptions} from './socket'

var opt:SocketPluginOptions={
    uri:'http://localhost:1337',
    debug:true
}
Vue.use(SocketPlugin,opt)
