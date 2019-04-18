<template>
    <v-alert error dismissible type="error" @input="$emit('dismissed')" :value="true"> 
      {{text}}
    </v-alert>
</template>

<script>
export default {
  props:{
    text:{
      type:String,
      required:true
    }
  }
}
</script>
