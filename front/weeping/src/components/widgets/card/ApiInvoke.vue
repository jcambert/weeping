<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="$emit('close')">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>{{api.friendlyName}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click="$emit('close')">Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-list three-line >
                <v-list-tile avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>Description</v-list-tile-title>
                        <v-list-tile-sub-title>{{api.description}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-list subheader>
                <v-subheader>Parametres</v-subheader>
                <v-list-tile avatar v-for="(input,index) in api.inputs" :key="index">
                    <v-list-tile-action>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-sub-title>
                            <v-text-field :label="input.description" v-model="param[index]"></v-text-field>
                        </v-list-tile-sub-title>
                    
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar>
                    <v-list-tile-action>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-btn color="success" @click="execute">Executer</v-btn>
                    </v-list-tile-content>
                </v-list-tile>
            
            </v-list>
            <v-divider></v-divider>
            <v-list v-show="Object.keys(apiResult).length>0">
                <json-viewer
                    :value="apiResult"
                    :expand-depth=5
                    copyable
                    sort></json-viewer>
            </v-list>
        </v-card>
    </v-dialog>
</template>

<script>
import Vue from 'vue'
import Component from "vue-class-component";
import JsonViewer from 'vue-json-viewer'
import _  from 'lodash'
@Component({
    props:{
        show:{
            type:Boolean,
            default:false
        },
        api:{
            type:Object
        }
    },
    components:{
        'json-viewer':JsonViewer
    },
    watch:{
        param:{
            handler: function(val, oldVal) {
                this.$store.dispatch('clearApiResult')
            },
            deep: true
        },
        show:function(newval){
            if(newval){
                this.$store.dispatch('clearApiResult')
                for (var x in this.param) if (this.param.hasOwnProperty(x)) delete this.param[x];
            }
        }
    }
})
export default class ApiInvoke extends Vue{
    param={}
    get dialog(){
        return this.show
    }
    execute(){
        this.$store.dispatch('executeApi',{apiname:this.api.type,param:this.param})
    }

    get apiResult(){
        return this.$store.getters.apiResult
    }
}
</script>

<style>

</style>
