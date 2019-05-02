<template>

    <v-card>
        <div class="text-xs-center">
            <v-chip :color="getTileColor(info)" text-color="white" v-for="(info,key) in tileInfos" :key="key">
                <v-avatar  :class="getTileColor(info,true)">{{info.value}}</v-avatar>
                {{info.text}}
            </v-chip>
        </div>
        <v-list two-line  class="pa-0">
            <v-divider inset></v-divider>
             <v-list-tile href="#" >
                <v-list-tile-action>
                    <v-icon color="primary">timeline</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title >Défaites / Victoires </v-list-tile-title>
                    <v-list-tile-sub-title>
                         <v-chip color="red" text-color="white">
                            <v-avatar>
                                <v-icon>trending_down</v-icon>
                            </v-avatar>
                            {{defaites}}
                        </v-chip>
                        <v-chip color="green" text-color="white">
                            <v-avatar>
                                <v-icon>trending_up</v-icon>
                            </v-avatar>
                            {{victoires}}
                        </v-chip>
                        <v-chip color="blue" text-color="white">
                            <v-avatar>
                                <v-icon>all_inclusive</v-icon>
                            </v-avatar>
                            {{parseInt( ( victoires/(victoires+defaites))*100)}} %
                        </v-chip>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
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
        parties:{
          //  type:Array,
            required:false,
            default:[]
        }

    },
    data: () => ({
        pointsParties:0,

    }),
    methods: {
      
      getTileColor(info,isChip){
          let res=""
          if(info.progression){
              res= info.value>=0?"green": "red"
          }else
            res="blue"
        return _.isUndefined(isChip)?  res:res.concat(" darken-4")

      }
    },
    computed:{
       tileInfos(){
          let res=[
            {text:'Classement',value:this.joueur.clast},
            {text:'Points Mensuels',value:parseInt(this.joueur.point)},
            {text:'Points Officiels',value:parseInt(this.joueur.valcla)},
            {text:'Prog. mensuelle',value:parseInt(this.joueur.point-this.joueur.valcla),progression:true},
            {text:'Prog. annuelle',value:parseInt(this.joueur.point-this.joueur.valinit),progression:true},
            //{text:'Points Parties',value:parseInt(this.pointsParties),progression:true},
            {text:'Points Virtuels',value:parseInt(this.joueur.valinit)+parseInt(this.joueur.pointsParties)}
          ];
          
          return res
      },
      victoires(){
          return  _.filter(this.parties,partie=>partie.victoire=="V").length || 0
      },
      defaites(){
          return  _.filter(this.parties,partie=>partie.victoire=="D").length || 0
      }
    },
    watch:{
        parties(parties){
           // console.log("parties has changed",parties)
            this.pointsParties=0
            _.forEach(parties,partie=>{
                var pts=window.spid.calculPoints({ja:{points:parseInt(this.joueur.valcla)},jb:{points:parseInt(partie.classement)}},{scorea:partie.victoire=="V"?1:0,scoreb:partie.victoire=="D"?1:0})
                this.pointsParties+=pts.pointa
                //this.victoires+= partie.victoire=="V"?1:0
                //this.defaites+= partie.victoire=="D"?1:0
            })
            
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
