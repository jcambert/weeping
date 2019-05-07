<template>
    <v-card>
       <v-card-text>
        <v-list two-line class="pa-0">
            
            <v-list-tile :href="`mailto:${club.mailcor}`" >
                <v-list-tile-action>
                    <v-icon color="primary">mail</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{club.nomcor}} {{club.prenomcor}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{club.mailcor}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile  @click="talkme()">
                <v-list-tile-action>
                    <v-icon color="primary">phone</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{club.telcor}}</v-list-tile-title>
                    <v-list-tile-sub-title>Telephone</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile >
                <v-list-tile-action>
                    <v-icon color="primary">location_on</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{club.nomsalle}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{club.adressesalle1}} {{club.codepsalle}} {{club.villesalle}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider inset v-if="club.web.length>0"></v-divider>
            <v-list-tile   v-if="club.web.length>0">
                <v-list-tile-action>
                    <v-icon  color="primary">cloud</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{club.web}}</v-list-tile-title>
                    
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        </v-card-text>
        <v-card-text>
          <v-expansion-panel>
            <v-expansion-panel-content>
            <template v-slot:header>
                <div>Joueurs <v-progress-circular indeterminate color="primary" v-if="loading"></v-progress-circular></div>
            </template>
            <v-card>
                <v-card-text>
                    <base-card :title="``"   v-if="joueurs.length>0" :searchable="true" :moreable="true">
                        <joueurs-card :joueurs="joueurs"></joueurs-card>
                    </base-card>
                </v-card-text>
            </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-card-text>
    </v-card>

</template>
  
        

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import BaseCard from '@/components/widgets/card/BaseCard.vue'
import JoueursCard from '@/components/widgets/card/JoueursCard.vue'
@Component({
    components:{
        'base-card':BaseCard,
        'joueurs-card':JoueursCard
    },
    props:{
        club:{
            type:Object,
            required:true
        },
        loadJoueurs:{
            type:Boolean,
            default:false
        }
    },
    watch:{
        loadJoueurs(newval){
            if(newval)
                this.$store.dispatch('getJoueurs',{numero:this.club.numero})
        }
    }
})
export default class ClubCard extends Vue{

    get joueurs(){
        return this.$store.getters.joueurs
    }
    get loading(){
        return this.$store.getters.loaders.joueurs
    }
    talkme(){
        alert('talk to '+club.prenomcor)
    }
    mounted(){
        if(this.loadJoueurs)
        this.$store.dispatch('getJoueurs',{numero:this.club.numero})
    }

    
}
</script>

<style>

</style>
