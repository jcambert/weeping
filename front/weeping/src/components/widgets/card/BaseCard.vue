<template>
    <div>
        <v-toolbar color="primary darken-3" dark >
            <v-btn dark icon @click="$emit('onLeft')" v-if="editable"><v-icon>chevron_left</v-icon></v-btn>
            <v-toolbar-title ><span class="body-1">{{title}}</span></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn dark icon class="mr-3" @click="$emit('search')" v-if="searchable"><v-icon>search</v-icon></v-btn>
            <v-btn dark icon class="mr-3" @click="$emit('edit')" v-if="editable"><v-icon>edit</v-icon></v-btn>
            <v-btn dark icon @click="$emit('more')" v-if="moreable"><v-icon>more_vert</v-icon></v-btn>
            <slot name="toolbar"></slot>
        </v-toolbar>
        <slot ></slot>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:""
        },
        searchable:{
            type:Boolean,
            default:false
        },
        editable:{
            type:Boolean,
            default:false
        },
        moreable:{
            type:Boolean,
            default:false
        } 
    },
}
</script>

<style>

</style>
