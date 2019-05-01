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

declare module 'vuetify/es5/components/Vuetify'

declare module 'vuetify/src/components/VToolbar/VToolbar'
declare module 'vuetify/src/components/VToolbar/VToolbarSideIcon'
declare module 'vuetify/src/components/VNavigationDrawer/VNavigationDrawer'
declare module 'vuetify/src/components/VList'
declare module 'vuetify/src/components/VList/VListTile'
declare module 'vuetify/src/components/VSubheader/VSubheader'
declare module 'vuetify/src/components/VStepper/VStepper'
declare module 'vuetify/src/components/VStepper/VStepperContent'
declare module 'vuetify/src/components/VStepper/VStepperStep'
declare module 'vuetify/src/components/VLabel/VLabel'
