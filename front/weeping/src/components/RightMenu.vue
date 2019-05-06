<template>
    <div column class="right-menu" justify-right >
        <v-btn small fab dark absolute  class="setting-fab"  color="red" @click="openThemeSettings">
            <v-icon>settings</v-icon>
        </v-btn>
        <v-btn small fab dark absolute  class="socket-fab"  color="red" @click="openMessages">
            <v-icon>alarm</v-icon>
        </v-btn>
        <v-navigation-drawer
            class="setting-drawer"
            temporary
            right
            v-model="themeDrawer"
            hide-overlay
            fixed
            >
            <theme-settings></theme-settings>
        </v-navigation-drawer> 
        
        <message  :show="messagesDrawer" v-on:close="messagesDrawer=false" v-show="message.message"></message>
    </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import ThemeSettings from '@/components/ThemeSettings';
import Message from '@/components/Message';
@Component({
    components:{
     ThemeSettings,
     Message
  },
})
export default class RightMenu extends Vue{
    themeDrawer=false
    messagesDrawer=false
    openThemeSettings () {
        this.$vuetify.goTo(0);
        this.themeDrawer = (!this.themeDrawer);
    }
    openMessages(){
        this.$vuetify.goTo(0);
        this.messagesDrawer = (!this.messagesDrawer);
    }
    get message(){
        return this.$store.getters.message
    }
}
</script>

<style lang="stylus" scoped>
.right-menu
    top:50%!important; 
    position: fixed;
    bottom: 0;
    right: 0;
    width:5%
.setting-fab 
    right:0;
    border-radius:0  
    top:-40px;
.socket-fab 
    right:0;
    border-radius:0  

</style>