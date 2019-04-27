<template>

    <v-card>
        <!--<v-layout column class="media ma-0">
            <v-card-title color="primary" class="pl-5 pt-0">
                <div class="headline pl-5 pt-1">{{joueur.nom}} {{joueur.prenom}}</div>
            </v-card-title>
            <v-divider ></v-divider>
        </v-layout>-->
        <div class="text-xs-center">
            <v-chip :color="getTileColor(info)" text-color="white" v-for="(info,key) in tileInfos()" :key="key">
                <v-avatar  :class="getTileColor(info,true)">{{info.value}}</v-avatar>
                {{info.text}}
            </v-chip>
        </div>
        <v-list two-line  class="pa-0">
            <v-divider inset></v-divider>
            <v-list-tile href="#" >
                <v-list-tile-action>
                    <v-icon color="primary">credit_card</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title >Licence</v-list-tile-title>
                    <v-list-tile-sub-title>{{joueur.licence}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile href="#" >
                <v-list-tile-action>
                    <v-icon color="primary">ballot</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title >Categorie</v-list-tile-title>
                    <v-list-tile-sub-title>
                        <v-tooltip bottom>
                        <span slot="activator">{{$store.getters.categorieAge[joueur.categ].value}}</span>
                        <span>{{$store.getters.categorieAge[joueur.categ].desc}}</span>
                        </v-tooltip>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>

</template>

<script>
export default {
    components:{
        
    },
    props:{
        joueur:{
            type:Object, 
            required:true 
        },

    },
    data: () => ({
        
    }),
    methods: {
      tileInfos(){
          let res=[
            {text:'Classement',value:this.joueur.clast},
            {text:'Points Mensuels',value:parseInt(this.joueur.point)},
            {text:'Points Officiels',value:parseInt(this.joueur.valcla)},
            {text:'Points Officiels',value:parseInt(this.joueur.valcla)},
            {text:'Progression mensuelle',value:parseInt(this.joueur.point-this.joueur.valcla),progression:true},
            {text:'Progression annuelle',value:parseInt(this.joueur.point-this.joueur.valinit),progression:true},
          ];
          
          return res
      },
      getTileColor(info,isChip){
          let res=""
          if(info.progression){
              res= info.value>=0?"green": "red"
          }else
            res="primary"
        return _.isUndefined(isChip)?  res:res.concat(" darken-4")

      }
    },
    computed:{
       
    }
}
</script>

<style lang="stylus" scoped>

</style>
