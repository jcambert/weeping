import _Vue, { ComponentOptions } from "vue"
import Logger from './logger';
var mixin:ComponentOptions< _Vue>={
    beforeCreate(this:  _Vue): void{
        var self =this as any
        if(!self.sockets) self.sockets = {};
        
        self.sockets.subscribe = (event, callback) => {
            self.$socketIO.emitter.addListener(event, callback, self);
        };

        self.sockets.unsubscribe = (event) => {
            self.$socketIO.emitter.removeListener(event, self);
        };
    },
    mounted():void{
        var self=this as any
        if(self.$options.sockets){
            Object.keys(self.$options.sockets).forEach(event => {

                if(event !== 'subscribe' && event !== 'unsubscribe') {
                    self.$socketIO.emitter.addListener(event, self.$options.sockets[event], self);
                    
                }

            });

        }
    },
    beforeDestroy():void{
        var self=this as any
        if(self.$options.sockets){

            Object.keys(self.$options.sockets).forEach(event => {

                self.$socketIO.emitter.removeListener(event, self);

            });

        }

    }
}

export default mixin