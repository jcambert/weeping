<template>
    <v-card>

        <v-list two-line class="pa-0">
            <div v-for="(joueur,index) in joueurs" :key="index">
                <v-list-tile href="#" >
                    
                    <v-list-tile-action>
                        <v-icon color="primary" v-if="joueur.sexe=='M'">fa-male</v-icon>
                        <v-icon color="primary" v-else>fa-female</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{joueur.nom}} {{joueur.prenom}} </v-list-tile-title>
                        <v-list-tile-sub-title>{{joueur.place}} {{joueur.point}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-tooltip bottom>
                            <v-btn icon ripple @click="$emit('onshowresultat',{id:equipe.id})" slot="activator">
                                <v-icon color="secondary lighten-1">more</v-icon>
                            </v-btn>
                            <span>Resultat de l'equipe</span>
                        </v-tooltip>
                    </v-list-tile-action>
                    
                </v-list-tile>
                <v-divider inset ></v-divider>
            </div>
            
        </v-list>
        
    </v-card>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
    props:{
      joueurs:{
        type:Array,
        required:true
      }
    }
})
export default class JoueursCard extends Vue {
    
}
</script>

<style>

</style>
