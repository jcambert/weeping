<template>
  <v-app id="login"  :dark="$vuetify.dark">
    <v-content>
      <v-container fluid fill-height color="primary">
        <loader :color="message.type" :message="message.message" :show="!connected" v-if="message.message"></loader>
        
        <v-layout column align-center justify-center>
          <v-flex xs12 sm8 md4 lg4  >
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img :src="config.logo" :alt="config.alt" width="120" height="120">
                  <h1 class="flex my-4 " lighten-1>{{config.name}} Identification </h1>
                </div>                
                <v-form  ref="form" v-model="valid"  v-on:submit.prevent="nop">
                    <v-text-field append-icon="person" name="licence" label="N° de Licence ou Nom" type="text" v-model="licence" required :rules="licenceRules"></v-text-field>
                    <v-text-field v-if="!isLicence()" append-icon="person" name="login" label="Prenom" type="text" v-model="prenom" required :rules="prenomRules"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block  @click="login" :disabled="loading || !formValid" :loading="loading">
                    Entrer 
                    <template v-slot:loader>
                      <span  class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </template>
                </v-btn>
                <v-btn v-on:click="clearForm()">Effacer</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        <right-menu></right-menu>

        <!-- App Footer -->
        <v-footer height="auto" class="pa-3 app--footer" fixed :dark="$vuetify.dark">
          <span class="caption">KD &copy; {{ new Date().getFullYear() }}</span>
          <v-spacer></v-spacer>
          <span class="caption mr-1"> Make With Love </span> <v-icon color="pink" small>favorite</v-icon>
          <!--<div>&copy; {{ new Date().getFullYear() }}</div>-->
        </v-footer>
      </v-container>
    </v-content>
    
  </v-app>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import Appconfig,{isInDev} from "@/api/app";
import Loader from '@/components/Loader.vue'
import RightMenu from '@/components/RightMenu.vue'

@Component({
  components:{
     RightMenu,
     Loader
  },
  props: {
    propMessage: String
  },
  sockets: {
        connect: function () {
            //console.log('socket connected')
            this.connected = true
            window.getApp.$emit('APP_CONNECTED');
        },
        disconnect:function(){
          this.connected = false
          window.getApp.$emit('APP_DISCONNECTED');
        },
        connect_error:function(err){
          this.connected=false
           window.getApp.$emit('APP_CONNECT_ERROR',err);
        }

    },
  watch:{
    message(newval){
     // console.log(newval.message)
      if(_.isUndefined( newval.message))return

      window.getApp.snackbar = {
              show: true,
              color: newval.type,
              text: newval.message
          };
     

    }
  }
})
export default class Login extends Vue{
  config=Appconfig
  rightDrawer=false
  licence=""
  prenom=""
  valid=false
  licenceRules= [v => !!v || 'Votre numero de licence ou votre nom sont requis']
  prenomRules= [v => !!v || 'Votre prenom est requis']
  connected = false
  login () {
      //console.log(this.$store);
      this.$store.dispatch('userLogin',{licence:this.licence,prenom:this.prenom})
    
    }
  clearForm() {
      this.$refs.form.reset();
  }
  isLicence() {
      return /^\d+$/.test(this.licence) || this.licence=="" || this.licence == undefined;
  }
  onDismissed(){
    this.$store.dispatch('clearError');
  }
  openThemeSettings () {
    this.$vuetify.goTo(0);
    this.rightDrawer = (!this.rightDrawer);
  }
  nop(){
    //do nothing to block enter key in form
    // do not remove
    //alert('toto')
  }
  mounted(){
    console.log(isInDev)
    this.$store.dispatch('setIsInDev',isInDev)
    this.$store.dispatch('clearApplication')
    this.$socket.connect()

    if(isInDev)
      this.licence="905821"
      //REMOVE IN PRODUCTION
      this.login()
    }
  get formValid() {
      return this.valid && this.connected;
  }
  get loading(){
    return this.$store.getters.loading
  }
  get error(){
    return this.$store.getters.error
  }
  get message(){
    return this.$store.getters.message
  }

  get isInDev(){
    return this.$store.getters.isInDev || false
  }

}
</script>
<style lang="stylus" scoped>
#login 
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
  

.setting-fab 
  top:50%!important; 
  right:0;
  border-radius:0  

</style>
