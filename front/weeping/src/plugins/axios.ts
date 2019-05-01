import Vue from 'vue'
import axios from 'axios'

const VueAxios=function (vue: typeof Vue,ax:typeof axios){
    if (!axios) {
       // console.error('You have to install axios')
        return
    }
   vue.prototype.axios = ax

   Object.defineProperties(Vue.prototype, {

    axios: {
      get() {
        return axios.get
      },
      post(){
        return axios.post
      }
    },

    $http: {
      get() {
        return axios.get
      },
      post(){
        return axios.post
      }
    }

  })

}

Vue.use(VueAxios,axios)
