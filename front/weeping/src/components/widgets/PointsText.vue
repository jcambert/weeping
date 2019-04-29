<template>
    <span :class="{'green--text':points>=0 && colored,  'red--text':points<0 && colored}">
        <span v-if="bracket">[</span>
        {{points}}
        <span v-if="text"> points</span>
        <span v-if="bracket">]</span>
        
        <slot></slot>
    </span>
</template>

<script>
export default {
  props:{
    points:{
      type:Number,
      //required:true,
      default:0
    },
    colored:{
        type:Boolean,
        default:true
    },
    text:{
        type:Boolean,
        default:true
    },
    bracket:{
        type:Boolean,
        default:false
    }

  }
}
</script>
