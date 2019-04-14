declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

import Vue from "vue";
import axios from 'axios'
declare module "vue/types/vue" {
  interface Vue {
    axios:typeof axios,
    
  }
  
}