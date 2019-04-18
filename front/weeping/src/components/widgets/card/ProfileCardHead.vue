<template>
    <v-layout column class="media ma-0">
        <v-card-title>
            <v-btn dark icon @click="$emit('onLeft')">
                <v-icon>chevron_left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn dark icon class="mr-3" @click="$emit('onEdit')">
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn dark icon @click="$emit('onMore')">
                <v-icon>more_vert</v-icon>
            </v-btn>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-title class="white--text pl-5 pt-5">
            <div class="display-1 pl-5 pt-5">{{nom}}&nbsp;{{prenom}}</div>
        </v-card-title>
    </v-layout>
</template>


<script>
export default {
    props:{
        nom:{
            type:String,
            required:true
        },
        prenom:{
            type:String
        }
    },
    data: () => ({

    }),
    methods:{
        
    }
}
</script>

<style>

</style>

