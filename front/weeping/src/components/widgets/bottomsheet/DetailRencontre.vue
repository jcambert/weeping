<template>
    <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dense dark color="primary">
                <v-btn icon dark @click="hide">
                    <v-icon>close</v-icon>
                </v-btn>
                
                    <span class="text-xs-center">[{{rencontre.resultat.equa}}] {{rencontre.resultat.resa}} - {{rencontre.resultat.resb}} [{{rencontre.resultat.equb}}]</span>
                
                <v-spacer></v-spacer>
                
            </v-toolbar>
            <v-card-text  >
                <v-layout wrap>
                     <v-flex lg4 md6 sm12 xs12  offset-lg4 offset-md3>
                         <v-expansion-panel  class="elevation-15 ml-3 mr-3">
                            <v-expansion-panel-content >
                                <template v-slot:header>
                                    <span class="title font-weight-medium subheader "> Joueurs Engagés</span>
                                </template>
                                <v-card v-for="(equipe,nom,index) in equipes" :key="index">
                                    <v-divider ></v-divider>
                                    <v-card-title primary-title>
                                        <span class="title font-weight-light"> {{equipe.club}}</span>
                                        <v-spacer></v-spacer>
                                        <span class="title font-weight-light"> {{equipe.total}}</span>
                                        
                                    </v-card-title>
                                    <v-divider inset></v-divider>
                                    <v-card-text v-for="(joueur,idx) in equipe.joueurs" :key="idx">
                                        <v-list>
                                            <v-list-tile  avatar @click="nop">
                                                <v-list-tile-avatar>
                                                    <v-btn fab dark small color="primary">
                                                        <v-icon v-if="joueur.sexe=='M'">fa-male</v-icon>
                                                        <v-icon v-else>fa-female</v-icon>
                                                    </v-btn>
                                                </v-list-tile-avatar>

                                                <v-list-tile-content>
                                                    <v-list-tile-title >{{joueur.nom}}</v-list-tile-title>
                                                </v-list-tile-content>

                                                <v-list-tile-action>
                                                    <v-badge :color="joueur.total>=0?'green':'red'">
                                                        <template v-slot:badge>
                                                            <span>{{joueur.total}}</span>
                                                        </template>
                                                        <span> {{joueur.points}} </span>
                                                    </v-badge>
                                                </v-list-tile-action>
                                               
                                            </v-list-tile>
                                             
                                        </v-list>
                                        
                                    </v-card-text>

                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        

                     </v-flex>
                    <v-flex lg4 md6 sm12 xs12  offset-lg4 offset-md3>
                        
                       <v-card class="elevation-15 ma-3">
                            <v-toolbar>
                                <p class="title text-uppercase" >Detail</p>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text v-for="(partie,number) in rencontre.partie" :key="number">
                                
                                <v-layout row >
                                    <v-flex xs4>
                                        <div class="text-xs-right body-1 text-truncate " :class="{'red--text': parseInt(partie.scorea)!=1,'green--text':parseInt(partie.scorea)==1}" >{{partie.ja}}</div>
                                    </v-flex>
                                    <v-flex xs4>
                                        <p class="text-xs-center  body-1 font-italic" >{{parseInt( partie.scorea)==1?1:0}}-{{parseInt( partie.scoreb)==1?1:0}}</p>
                                    </v-flex>
                                    <v-flex xs4>
                                        <p class="text-xs-left  body-1 text-truncate" :class="{'red--text': parseInt(partie.scoreb)!=1,'green--text':parseInt(partie.scoreb)==1}" >{{partie.jb}} </p>
                                    </v-flex>
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
        rencontre:{
            type:Object,
            required:true
        }
    },
    computed:{
        equipes(){
            var fn=function(joueur,ab){
                var v=ab?joueur.xca:joueur.xcb
                var res= {sexe:v.split(' ')[0].trim().toUpperCase(),points:parseInt( v.match(/[0-9]+/)[0])}

                return res
            }
            var res={}
            res['a']={club:this.rencontre.resultat.equa,total:0,joueurs:[]}
            res['b']={club:this.rencontre.resultat.equb,total:0,joueurs:[]}
            _.forEach(this.rencontre.joueur,(joueur,index)=>{
                var ja=Object.assign({id:index+1,nom:joueur.xja,total:0,parties:[]},fn(joueur,true))
                var jb=Object.assign({id:index+1,nom:joueur.xjb,total:0,parties:[]},fn(joueur))
                res['a'].joueurs.push(ja)
                res['b'].joueurs.push(jb)
                res['a'].total+=ja.points
                res['b'].total+=jb.points
            })
            //console.log(res)
            _.forEach(_.filter(this.rencontre.partie,p=>p.ja!="Double"),partie=>{
                //console.log(partie)
                var ja=_.findIndex( res['a'].joueurs,j=>j.nom==partie.ja)
                //console.log("ja",ja)
                var jb=_.findIndex( res['b'].joueurs,j=>j.nom==partie.jb)
                //console.log("jb",jb)
                partie.scorea=partie.scorea=="1"?1:0
                partie.scoreb=partie.scoreb=="1"?1:0
                var ga=partie.scorea
                var gb=partie.scoreb
                

                var points=window.spid.calculPoints({ja:res['a'].joueurs[ja],jb:res['b'].joueurs[jb]},partie)
                res['a'].joueurs[ja].parties.push(points.pointa)
                res['b'].joueurs[jb].parties.push(points.pointb)
                res['a'].joueurs[ja].total+=points.pointa
                res['b'].joueurs[jb].total+=points.pointb
                //console.log(points)
            })
            //console.log(res)
            return res
           
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
