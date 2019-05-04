export default new class VueSocketIOLogger {
    debug: boolean;
    prefix: string;

    constructor() {
        this.debug = false;
        this.prefix = '%cVue-Socket.io: ';
    }

    info(text, data = '') {

        if(this.debug) window.console.info(this.prefix+`%c${text}`, 'color: blue; font-weight: 600', 'color: #333333', data);

    }

    error(...args:string[]) {

        if(this.debug) window.console.error(this.prefix, args);

    }

    warn(...args:string[]) {

        if(this.debug) window.console.warn(this.prefix, args);

    }

    event(text, data = ''){

        if(this.debug) window.console.info(this.prefix+`%c${text}`, 'color: blue; font-weight: 600', 'color: #333333', data);

    }

}