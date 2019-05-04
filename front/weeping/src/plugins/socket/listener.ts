import SocketEmitter from './emitter';
import Logger from './logger';

export default class SocketListener{
    static staticEvents = [
        'connect',
        'error',
        'disconnect',
        'reconnect',
        'reconnect_attempt',
        'reconnecting',
        'reconnect_error',
        'reconnect_failed',
        'connect_error',
        'connect_timeout',
        'connecting',
        'ping',
        'pong'
    ];

    io:SocketIOClient.Socket
    emitter:SocketEmitter
    constructor(io, emitter){
        this.io = io;
        this.register();
        this.emitter = emitter;
    }

    register(){
        (this.io as any).onevent = (packet) => {
            let [event, ...args] = packet.data;

            if(args.length === 1) args = args[0];

            this.onEvent(event, args)
        };
        SocketListener.staticEvents.forEach(event => this.io.on(event, args => this.onEvent(event, args)))
    }

    onEvent(event, args){
        this.emitter.emit(event, args);
    }
}