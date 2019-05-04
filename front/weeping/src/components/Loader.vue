<template>
    <v-dialog
      v-model="show"
      fullscreen hide-overlay transition="dialog-bottom-transition"
      persistent
    >
      <v-card :color="color" dark>
        <v-card-text>
         {{message}}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
          <slot></slot>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  props:{
    show:{
      type:Boolean,
      required:true
    },
    color:{
      type:String,
      required:true
    },
    message:{
      type:String,
      required:true
    }
  }
})
export default class Login extends Vue{
  
}
</script>