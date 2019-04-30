declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

import Vue from "vue";
import axios from 'axios'
import {ISpidService} from '@/services/spid'
import VueRouter from "vue-router";
import { IMessageService } from "./services/message";
declare module "vue/types/vue" {
  interface Vue {
    axios:typeof axios,
    spid:ISpidService,
    $router:VueRouter,
    $message:IMessageService,
    snackbar:{}
  }
  
}