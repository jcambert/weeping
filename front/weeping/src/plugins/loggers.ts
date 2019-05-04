import Vue from 'vue'
import {LoggerPlugin,LoggerPluginOptions} from './logger'
import app from '@/api/app'
var opt:LoggerPluginOptions={
    level:app.logger.level,
    debug:app.logger.debug
}
Vue.use(LoggerPlugin,opt)