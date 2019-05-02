<template>
  <v-toolbar
    color="primary darken-3"
    fixed
    :dark="$vuetify.dark"
    app
    >
    <v-toolbar-title class="ml-0 pl-3"><span ></span></v-toolbar-title>
    <v-toolbar-side-icon @click.stop="handleDrawerToggle" dark></v-toolbar-side-icon>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Rechercher"
        class="hidden-sm-and-down"
        dark
        v-model="searchTerm"
        >
      </v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items >
        <v-btn dark flat :href="'mailto:'+config.dev.mail">
          Hire Me
        </v-btn>   
      </v-toolbar-items>
    
      <v-btn icon :href="config.dev.github" dark>
        <v-icon class="fa-2x">fa-github</v-icon>
      </v-btn>
      <v-btn icon @click="handleFullScreen()" dark>
        <v-icon>fullscreen</v-icon>
      </v-btn>
      <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
        <v-btn icon flat slot="activator" dark>
        <v-badge color="red" overlap>
          <span slot="badge">3</span>
          <v-icon medium>notifications</v-icon>
        </v-badge>
        </v-btn>
        <notification-list></notification-list>
      </v-menu>
      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition" >
       
          <v-btn icon large flat slot="activator" dark>
            <v-avatar size="30px">
              <img :src="config.dev.avatar" :alt="config.dev.name"/>
            </v-avatar>
          </v-btn>

        <v-list class="pa-0">
          <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
  </v-toolbar>
</template>
<script>
import NotificationList from '@/components/widgets/list/NotificationList';
import Util from '@/util';
import Appconfig from "@/api/app";
export default {
  name: 'app-toolbar',
  components: {
    NotificationList
  },
  props:{
    debounce:{
      type:Number,
      default:700
    }
  },
  data: () => ({
    config:Appconfig,
    searchTerm:"",
    items: [
      {
        icon: 'account_circle',
        href: '#',
        title: 'Profile',
        click: (e) => {
           /* eslint-disable no-console */
          console.log(e);
          /* eslint-enable no-console */
        }
      },
      {
        icon: 'settings',
        href: '#',
        title: 'Settings',
        click: (e) => {
          /* eslint-disable no-console */
          console.log(e);
          /* eslint-enable no-console */
        }
      },
      {
        icon: 'fullscreen_exit',
        href: '#',
        title: 'Logout',
        click: (e) => {
          window.getApp.$emit('APP_LOGOUT');
        }
      }
    ],
  }),
  computed: {
    toolbarColor () {
      return this.$vuetify.options.extra.mainNav;
    }
  },
  methods: {
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    },
    handleSearch(value){
     
      this.$emit('input', value)
    },

  },
  created:function(){
    this.debouncedGetAnswer = _.debounce(()=>this.$emit("input",this.searchTerm), this.debounce)
  },
  watch:{
    searchTerm(old_,new_){
      this.debouncedGetAnswer()
    }
  }
};
</script>