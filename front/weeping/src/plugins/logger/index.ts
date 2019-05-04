import _Vue, { ComponentOptions } from "vue"
import * as _ from 'lodash'

export enum Level{
    DEBUG=0,
    INFO,
    WARN,
    ERROR,
    FATAL
}
export interface ILogger{
    Level:Level
    debug(text, data?:string):void
    info(text, data?:string):void
    error(...args:string[]):void
    warn(...args:string[]):void
    fatal(...args:string[]):void
}
export function LoggerPlugin<AxiosPlugOptions>(Vue: typeof _Vue, options?: LoggerPluginOptions): void {
    var plugin:Logger=new Logger(Vue, options)
    Vue.prototype.$logger = plugin
}

export interface LoggerPluginOptions {
    debug?:boolean
    level?:Level 
    prefix?:string
}

export class Logger implements ILogger{
    debug_:boolean
    prefix:string
    level_: Level;
    constructor(Vue: typeof _Vue, options?: LoggerPluginOptions){
        var opt:LoggerPluginOptions= _.merge({},options)
        this.debug_=opt.debug || false
        this.prefix = opt.prefix || "%cVue-Socket.io: ";
        this.level_ = opt.level || Level.ERROR
    }

    public get Level():Level{
        return this.level_
    }

    public set Level(level:Level){
        this.level_=level
    }

    debug(text, data = ''){
        if(this.debug_ && this.level_>=Level.DEBUG) window.console.info("[DEBUG] "+ this.prefix+`%c${text}`, 'color: blue; font-weight: 600', 'color: #333333', data);
    }

    info(text, data = '') {
        
        if(this.debug_ && this.level_>=Level.INFO) window.console.info("[INFO] "+this.prefix+`%c${text}`, 'color: blue; font-weight: 600', 'color: #333333', data);

    }

    error(...args:string[]) {

        if(this.debug_ && this.level_>=Level.ERROR) window.console.error("[ERROR] "+this.prefix, args);

    }

    warn(...args:string[]) {

        if(this.debug_  && this.level_>=Level.WARN) window.console.warn("[WARN] "+this.prefix, args);

    }

    fatal(...args:string[]) {

        if(this.debug_ && this.level_>=Level.FATAL) window.console.warn("[FATAL] "+this.prefix, args);

    }

}