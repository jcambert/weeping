<template>
    <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="hide">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Resultat {{resultats.division}}</v-toolbar-title>
                <v-spacer></v-spacer>
                
            </v-toolbar>
            <v-card-text>
                <v-layout wrap>
                    <v-flex lg4 md6 sm12 xs12 v-for="(journee,key,index) in journees" :key="key">
                        <v-card  class="elevation-15 ma-3">
                            <v-toolbar>
                                <p class="title text-uppercase" >journee {{index+1}}</p>
                                <v-spacer></v-spacer>
                                <p class="subheading">{{key}}</p>
                            </v-toolbar>
                            <v-card-text v-for="(r,index) in journee" :key="index">
                                
                                <v-layout row >
                                    <v-flex xs4>
                                        <div class="text-xs-right caption text-truncate" >{{r.equa}}</div>
                                    </v-flex>
                                    <v-flex xs4>
                                        <p class="text-xs-center caption font-italic" >{{r.scorea}}-{{r.scoreb}}</p>
                                    </v-flex>
                                    <v-flex xs4>
                                        <p class="text-xs-left caption text-truncate" >{{r.equb}}</p>
                                    </v-flex>
                                    <v-list-tile-action>
                                        <v-tooltip bottom>
                                            <v-btn fab dark small slot="activator" @click="$emit('wantshowdetailrencontre',r)">
                                                <v-icon >people</v-icon>
                                            </v-btn>
                                            <span v-if="r.scorea!=''">Detail de la rencontre</span>
                                            <span v-else>Joueurs possibles pour la rencontre</span>
                                        </v-tooltip>
                                    </v-list-tile-action>
                                </v-layout>
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
        resultats:{
            type:Object,
            required:true
        }
    },
    computed:{
        journees(){
            return _.groupBy(this.resultats.resultat,'dateprevue')
        }
    },
    methods:{
        hide(){
            this.$emit('close')
        }
    },
    data: () => ({
        
    })
}
</script>

<style>

</style>
