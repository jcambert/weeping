<template>
<v-dialog
        v-model="show"
        fullscreen
        hide-overlay
        transition="dialog-right-transition"
        scrollable
      >
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon dark @click="close()">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Message</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="close()">Fermer</v-btn>
            </v-toolbar-items>
           
          </v-toolbar>
          

          <div style="flex: 1 1 auto;" v-if="message">
            {{message.message}}
          </div>
        </v-card>
      </v-dialog>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import colors from 'vuetify/es5/util/colors';
import Appconfig from '@/api/app'
@Component({
    props:{
      show:{
        type:Boolean,
        required:true
      }
    }
})

export default class Message extends Vue{
  

  close(){
    this.$emit('close')
  }
  get message(){
    return this.$store.getters.message
  }
};
</script>
<style lang="stylus" scoped>
       
</style>
