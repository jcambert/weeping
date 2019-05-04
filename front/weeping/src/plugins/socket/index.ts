import _Vue, { ComponentOptions } from "vue"
import mixin from './mixin'
import * as SocketIO from 'socket.io-client'
import * as _ from 'lodash'
import SocketEmitter from './emitter';
import SocketListener from './listener';
import Logger from './logger';
// export type PluginFunction<T> = (Vue: typeof _Vue, options?: T) => void;
export function SocketPlugin<AxiosPlugOptions>(Vue: typeof _Vue, options?: SocketPluginOptions): void {
    
    var plugin:Socket=new Socket(Vue, options)
    Vue.prototype.$socket = plugin.io
    Vue.prototype.$socketIO=plugin


    Vue.mixin(mixin)

}

export interface SocketPluginOptions {
    debug?:boolean
    uri:string,
    connectionOptions?:SocketIOClient.ConnectOpts
}

export class Socket{
    io: SocketIOClient.Socket;
    emitter: SocketEmitter;
    listener: SocketListener;
    constructor(Vue: typeof _Vue, options?: SocketPluginOptions){
        var opt:SocketPluginOptions= _.merge({uri:"http://localhost",connectionOptions:{autoConnect:false,transports:['websocket']}},options)
        Logger.debug =opt.debug || false;
        this.io=SocketIO.connect(opt.uri,opt.connectionOptions);
        this.emitter = new SocketEmitter();
        this.listener = new SocketListener(this.io,this.emitter)
    }
}