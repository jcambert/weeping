<template>
   <div id="appRoot">
     <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app" :dark="$vuetify.dark">
          <!--<app-drawer class="app--drawer"></app-drawer>-->
          <app-toolbar class="app--toolbar" @input="onSearch"></app-toolbar>
          <v-content>
            <!-- Page Header -->
           <!--<page-header v-if="$route.meta.breadcrumb"></page-header>-->
            <div class="page-wrapper">
              <router-view></router-view>
            </div>   
            <!-- App Footer -->
           <!-- <v-footer height="auto" class="pa-3 app--footer hidden-md-and-down" fixed :dark="$vuetify.dark" >
              <span class="caption">KD &copy; {{ new Date().getFullYear() }}</span>
              <v-spacer></v-spacer>
              <span class="caption mr-1"> Make With Love </span> <v-icon color="pink" small>favorite</v-icon>
              
            </v-footer>-->
          </v-content>
        <!-- Go to top -->
        <app-fab></app-fab>
        <right-menu></right-menu>
        <!-- theme setting -->
        <!--<v-btn small fab dark falt fixed top="top" right="right" class="setting-fab" color="red" @click="openThemeSettings">
          <v-icon>settings</v-icon>
        </v-btn>
        <v-navigation-drawer
          class="setting-drawer"
          temporary
          right
          v-model="rightDrawer"
          hide-overlay
          fixed
          >
          <theme-settings></theme-settings>
        </v-navigation-drawer> 
        -->
        
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view :key="$route.fullpath"></router-view>
          
        </keep-alive>
         
      </transition>
    </template>
    <v-snackbar
      :timeout="3000"
      bottom
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      <span v-html=" snackbar.text"></span>
      <v-btn dark flat @click.native="snackbar.show = false" icon> 
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>   
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import AppToolbar from '@/components/AppToolbar';
//import AppDrawer from '@/components/AppDrawer';
import AppFab from '@/components/AppFab';
import AppEvents from  '@/events';
//import PageHeader from '@/components/PageHeader';
//import ThemeSettings from '@/components/ThemeSettings';
import {spidService} from '@/services/spid.ts'
import colors from 'vuetify/es5/util/colors'
import RightMenu from '@/components/RightMenu.vue'
@Component({
  components:{
    AppToolbar,
    //AppDrawer,
    AppFab,
    //PageHeader,
   // ThemeSettings,
    RightMenu
  },
})

export default class Application extends Vue{

    expanded= true
    //rightDrawer= false,
    searchTerm=""
    snackbar= {
      show: false,
      text: '',
      color: '',
    }
  created () {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
    window.spid = spidService;
  }
  mounted(){
    this.$vuetify.dark=true
    this.$vuetify.theme.primary={
            sideNav: 'red',
            mainNav: 'red',
            sideManu: 'green'
          }
  }

  /*openThemeSettings () {
    this.$vuetify.goTo(0);
    this.rightDrawer = (!this.rightDrawer);
  },*/
  onSearch(value){
    // console.log(value)
    this.$store.dispatch("searchTerm",value);
  }
  


}
</script>

<style lang="stylus" scoped>
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
 

#nav
  padding 30px
  a
    font-weight bold
    &.router-link-exact-active
      color #42b983

.setting-fab 
  top:50%!important; 
  right:0;
  border-radius:0  

.page-wrapper
  min-height:calc(100vh - 64px - 50px - 81px );  
</style>
