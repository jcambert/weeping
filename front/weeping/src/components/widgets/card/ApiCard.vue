<template>

    <v-card>
        <api-invoke :show="dialog" @close="dialog=false" :api="api"></api-invoke>
        <v-list two-line  class="pa-0">
        <template v-for="(api,index) in apis">
            <v-list-tile href="#"  :key="index">
                <v-list-tile-action>
                        <v-btn icon ripple @click="invoke(api)">
                        <v-icon color="grey lighten-1">send</v-icon>
                    </v-btn>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title >{{api.friendlyName}} </v-list-tile-title>
                        <v-list-tile-sub-title >
                            {{api.description}}
                        </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider inset :key="`${index}-sep`"></v-divider>
        </template>
        </v-list>
    </v-card>
</template>

<script>
import Vue from 'vue'
import Component from "vue-class-component";
import ApiInvoke from './ApiInvoke.vue';

@Component({
   components:{
       'api-invoke':ApiInvoke
   }
})
export default class ApiCard extends Vue {
    dialog=false
    api={}

    get apis(){
        return this.$store.getters.apis
    }
    mounted(){
        this.$store.dispatch('getApisInfo',)
    }
    invoke(api){
        this.api=api
        this.dialog=true
    }
}
</script>

<style>

</style>

