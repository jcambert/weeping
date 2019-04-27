<template>
    <div>
        <v-toolbar color="primary darken-3" dark >
            <v-btn dark icon @click="$emit('onLeft')" v-if="editable"><v-icon>chevron_left</v-icon></v-btn>
            <v-toolbar-title >{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn dark icon class="mr-3" @click="$emit('onSearch')" v-if="searchable"><v-icon>search</v-icon></v-btn>
            <v-btn dark icon class="mr-3" @click="$emit('onEdit')" v-if="editable"><v-icon>edit</v-icon></v-btn>
            <v-btn dark icon @click="$emit('onMore')" v-if="moreable"><v-icon>more_vert</v-icon></v-btn>
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
            default:true
        },
        editable:{
            type:Boolean,
            default:true
        },
        moreable:{
            type:Boolean,
            default:true
        } 
    },
}
</script>

<style>

</style>
