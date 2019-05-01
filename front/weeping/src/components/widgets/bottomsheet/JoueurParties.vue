<template>
    <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dense dark color="primary">
                <v-btn icon dark @click="hide">
                    <v-icon>close</v-icon>
                </v-btn>
                
                    <span class="text-uppercase font-weight-medium subheader">Partie de {{joueur.prenom}} <points :points="parseInt(joueur.valcla)"  :bracket="true" :colored="false"></points>  <points :points="joueur.pointsParties"  :bracket="true"></points> </span>
                
                <v-spacer></v-spacer>
                
            </v-toolbar>
            <v-card-text  >
                <v-layout wrap>
                    <v-flex lg4 md6 sm12 xs12  offset-lg4 offset-md3>
                        
                       <v-card class="elevation-15 ma-3" v-for="(parties_,date) in grouped" :key="date">
                            <v-toolbar>
                                <p class=" text-uppercase font-weight-medium subheader " >{{date}}  {{parties[0].epreuve}}  <points :points="pointsDate[date]" :bracket="true" ></points></p>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                
                                <v-list>
                                    <v-list-tile  avatar @click="nop" v-for="(partie,number) in parties_" :key="number">
                                        <v-list-tile-avatar></v-list-tile-avatar>

                                        <v-list-tile-content>
                                            <v-list-tile-title >{{partie.nom}}</v-list-tile-title>
                                        </v-list-tile-content>

                                        <v-list-tile-action>
                                            <v-badge :color="partie.victoire=='V'?'green':'red'">
                                                <template v-slot:badge>
                                                    <span>{{ partie.points}}</span>
                                                </template>
                                                <span> {{partie.classement}} </span>
                                            </v-badge>
                                            
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
import PointsText from '@/components/widgets/PointsText.vue'
export default {
    components:{
        'points':PointsText
    },
    props:{
        show:{
            type:Boolean,
            default:false
        },
        parties:{
            required:false,
            default:[]
        },
        joueur:{
            type:Object,
            required:true
        }
    },
     data: () => ({
        pointsDate:{}
    }),
    computed:{
        grouped(){
            var ja={}
            var jb={}
            var p={}

            ja.points=this.joueur.valcla
            this.clearJoueurPointsPartie()
            this.clearPointsDate()
            var res= _.groupBy(
                _.forEach(this.parties,partie=>{
                     
                    jb.points=partie.classement
                    p.scorea=partie.victoire=='V'?1:0
                    p.scoreb=p.scorea==1?0:1
                    var points=window.spid.calculPoints({ja:ja,jb:jb},p)
                    //console.log(p,points,'1')
                    partie.points = points.pointa
                    this.addJoueurPointsPartie(partie.points)
                    if(!( partie.date in this.pointsDate))
                        this.clearPointsDate(partie.date)
                    this.addPointsDate(partie.date,partie.points)
                }),
            'date')

            return res
        }
    },
    methods:{
        hide(){
            this.$emit('close')
        },
        nop(){

        },
        clearPointsDate(date){
            if(!date)
                this.pointsDate={}
            else
                this.pointsDate[date]=0
        },
        addPointsDate(date,points){
             this.pointsDate[date]+=points
        },
        addJoueurPointsPartie(points){
            this.joueur.pointsParties+=points
        },
        setJoueurPointsPartie(points){
            this.joueur.pointsParties=points
        },
        clearJoueurPointsPartie(){
            this.joueur.pointsParties=0
        },
        
    }
}
</script>

<style>

</style>
