import Logger from './logger';
export default class SocketEmitter{
    listeners: Map<any, any>;
    constructor(){
        this.listeners = new Map();
    }

    addListener(event, callback, component){

        if(typeof callback === 'function'){

            if (!this.listeners.has(event)) this.listeners.set(event, []);
            this.listeners.get(event).push({ callback, component });

            Logger.info(`#${event} subscribe, component: ${component.$options.name}`);

        } else {

            throw new Error(`callback must be a function`);

        }

    }

    removeListener(event, component){

        if(this.listeners.has(event)){

            const listeners = this.listeners.get(event).filter(listener => (
                listener.component !== component
            ));

            if (listeners.length > 0) {
                this.listeners.set(event, listeners);
            } else {
                this.listeners.delete(event);
            }

            Logger.info(`#${event} unsubscribe, component: ${component.$options.name}`);

        }

    }

    emit(event, args){

        if(this.listeners.has(event)){

            Logger.info(`Broadcasting: #${event}, Data:`, args);

            this.listeners.get(event).forEach((listener) => {
                listener.callback.call(listener.component, args);
            });

        }

        if(event !== 'ping' && event !== 'pong') {
            //this.dispatchStore(event, args);
        }

    }

}