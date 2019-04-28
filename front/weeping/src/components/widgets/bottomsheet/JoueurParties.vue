<template>
    <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dense dark color="primary">
                <v-btn icon dark @click="hide">
                    <v-icon>close</v-icon>
                </v-btn>
                
                    <span class="text-xs-center"></span>
                
                <v-spacer></v-spacer>
                
            </v-toolbar>
            <v-card-text  >
                <v-layout wrap>
                    <v-flex lg4 md6 sm12 xs12  offset-lg4 offset-md3>
                        
                       <v-card class="elevation-15 ma-3">
                            <v-toolbar>
                                <p class="title text-uppercase" ></p>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text v-for="(partie,number) in parties" :key="number">
                                <v-list>
                                    <v-list-tile  avatar @click="nop">
                                        <v-list-tile-avatar>
                                            <v-btn fab dark small color="primary">
                                                <v-icon v-if="partie.victoire=='M'">fa-male</v-icon>
                                                <v-icon v-else>fa-female</v-icon>
                                            </v-btn>
                                        </v-list-tile-avatar>

                                        <v-list-tile-content>
                                            <v-list-tile-title >{{partie.nom}}</v-list-tile-title>
                                        </v-list-tile-content>

                                        <v-list-tile-action>
                                            <!--<v-badge :color="partie.total>=0?'green':'red'">
                                                <template v-slot:badge>
                                                    <span>{{joueur.total}}</span>
                                                </template>
                                                <span> {{joueur.points}} </span>
                                            </v-badge>-->
                                        </v-list-tile-action>
                                        
                                    </v-list-tile>
                                        
                                </v-list>
                                
                            </v-card-text>
                           
                        </v-card>
                        
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props:{
        show:{
            type:Boolean,
            default:false
        },
        parties:{
            type:Array,
            required:false,
            default:[]
        }
    },
    computed:{
        grouped(){
            
        }
    },
    methods:{
        hide(){
            this.$emit('close')
        },
        nop(){

        }
    },
    data: () => ({
        
    })
}
</script>

<style>

</style>
