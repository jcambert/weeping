<template>
    <v-card>

        <v-list two-line class="pa-0">
            <template v-for="(equipe,index) in equipes" >
                <v-list-tile href="#" :key="index">
                    
                    <v-list-tile-action>
                        <v-icon color="primary">group</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{equipe.libdivision}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{equipe.libequipe}}</v-list-tile-sub-title>
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
                <v-divider inset></v-divider>
            </template>
            
        </v-list>
        
    </v-card>
</template>

<script>
export default {
    props:{
        equipes:{
            type:Array, 
            required:true 
        }
    },
    computed:{

    }
}
</script>

<style>

</style>
