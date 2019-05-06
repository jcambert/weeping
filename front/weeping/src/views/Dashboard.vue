<template>
    <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
        <div id="pageDashboard">
            <v-container grid-list-xl fluid>
                <loader :color="message.type" :message="message.message" :show="!connected" v-if="message.message && message.type=='error'"></loader>
                <v-layout row wrap>
                     <v-flex lg4 sm12 xs12>
                        <base-card :title="`${joueur.nom} ${joueur.prenom}`"  v-if="joueur">
                            <template v-slot:toolbar>
                                <v-tooltip bottom>
                                    <v-btn dark icon @click="wantShowParties" slot="activator"><v-icon>supervised_user_circle</v-icon></v-btn>
                                    <span>Voir toutes les rencontres de {{joueur.prenom}}</span>
                                </v-tooltip>
                            </template>
                            <joueur-card  :joueur="joueur" :parties="joueurParties"></joueur-card>
                        </base-card>
                    </v-flex>
                    <v-flex lg4 sm12 xs12>
                        <base-card :title="club.nom"  v-if="club" >
                            <club-card :club="club" ></club-card>
                        </base-card>
                    </v-flex>   
                     <v-flex lg4 sm12 xs12>
                        <base-card :title="`Joueurs`"   v-if="joueurs.length>0" >
                            <joueurs-card :joueurs="joueurs"></joueurs-card>
                        </base-card>
                    </v-flex> 
                    <v-flex lg4 sm12 xs12>
                        <base-card :title="`Equipes Phase ${currentPhase}`"   v-if="equipes.length>0" >
                            <equipes-card :equipes="equipes" v-on:onshowresultat="wantShowResultat"></equipes-card>
                        </base-card>
                    </v-flex>
                    <v-flex lg4 sm12 xs12 v-for="(clt,key) in classementequipes" :key="key" >
                        <base-card :title="`Classement ${clt.division}`"   :moreable="true" >
                            <classement-equipes-card :classement="clt.classement" ></classement-equipes-card>
                        </base-card>
                    </v-flex>
                </v-layout>
               
            </v-container>
        </div>
        <resultat-equipe :resultats="selectedResultat" :show="showResultatSheet" v-if="selectedResultat" v-on:close="showResultatSheet=false" v-on:wantshowdetailrencontre="wantShowDetailRencontre"></resultat-equipe>
        <detail-rencontre :rencontre="detailRencontre" :show="showDetailRencontre" v-if="detailRencontre" v-on:close="showDetailRencontre=false" ></detail-rencontre>
        <joueur-parties :joueur="joueur" :parties="joueurParties" v-if="joueur && joueurParties" :show="showParties" v-on:close="showParties=false"></joueur-parties>
    </vue-perfect-scrollbar>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import BaseCard from '@/components/widgets/card/BaseCard.vue'
//import ProfileCard from '@/components/widgets/card/ProfileCard.vue'
import ClubCard from '@/components/widgets/card/ClubCard.vue'
import JoueurCard from '@/components/widgets/card/JoueurCard.vue'
import JoueursCard from '@/components/widgets/card/JoueursCard.vue'
import EquipeCard from '@/components/widgets/card/EquipesCard.vue'
import ClassementEquipesCard from '@/components/widgets/card/ClassementEquipesCard.vue'
import ResultatEquipe from '@/components/widgets/bottomsheet/ResultatEquipe.vue'
import DetailRencontre from '@/components/widgets/bottomsheet/DetailRencontre.vue'
import JoueurParties from '@/components/widgets/bottomsheet/JoueurParties.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import Loader from '@/components/Loader.vue'
import RightMenu from '@/components/RightMenu.vue'
@Component({
     components:{
        VuePerfectScrollbar,
        'base-card':BaseCard,
        //'profile-card':ProfileCard,
        'club-card':ClubCard,
        'joueur-card':JoueurCard,
        'equipes-card':EquipeCard,
        JoueursCard,
        'classement-equipes-card':ClassementEquipesCard,
        'resultat-equipe':ResultatEquipe,
        'detail-rencontre':DetailRencontre,
        'joueur-parties':JoueurParties,
        'loader':Loader,
        
    },
    watch:{
        user(newval){
            this.$store.dispatch('getClubInfo',{numero:newval.club})
            this.$store.dispatch('getJoueurInfo',{licence:newval.licence})
            this.$store.dispatch('getJoueurParties',{licence:newval.licence})
            
        },
        club(newval){
            this.$store.dispatch('getJoueurs',{numero:newval.numero})
            this.$store.dispatch('getEquipes',{numero:newval.numero})
        },
        equipes(newval){
            _.forEach(newval,equipe=>{
                this.$store.dispatch('getClassementEquipe',{ equipe:equipe})
                this.$store.dispatch('getResultatEquipe',{ equipe:equipe})
            })
            
        },
        message(newval){
           
            if(_.isUndefined( newval.message) )return

            window.getApp.snackbar = {
                show: true,
                color: newval.type,
                text: newval.message
            };
        }
    },
     sockets: {
        connect: function () {
            this.$logger.debug('socket connected')
            this.connected = true
            window.getApp.$emit('APP_CONNECTED');
        },
        disconnect:function(){
          this.connected = false
          window.getApp.$emit('APP_DISCONNECTED');
        },
    },
})
export default class Dashboard extends Vue{
    scrollSettings= {
        maxScrollbarLength: 160
    }
    showResultatSheet=false
    showDetailRencontre=false
    showParties=false
    connected = false
    mounted(){
        if(this.user){
            this.$store.dispatch('getClubInfo',{numero:this.user.club})
            this.$store.dispatch('getJoueurInfo',{licence:this.user.licence})
            this.$store.dispatch('getJoueurParties',{licence:this.user.licence})
        }
    }

    wantShowResultat(id){
        this.$store.dispatch('selectEquipe',id);
        
        this.showResultatSheet=true
    }
    wantShowDetailRencontre(rencontre){
        this.$store.dispatch('getDetailRencontre',rencontre.lien)
        this.showDetailRencontre=true
    }
    wantShowParties(){
        this.showParties=true
    }

    get user(){
        return this.$store.getters.user
    }
    get club(){
        return this.$store.getters.club
    }
    get joueur(){
        return this.$store.getters.joueur
    }
    get equipes(){
        return this.$store.getters.equipes
    }
    get joueurs(){
        return this.$store.getters.joueurs
    }
    get equipesCurrentPhase(){
        return this.$store.getters.equipesCurrentPhase
    }
    get classementequipes(){
        return this.$store.getters.classementequipes 
    }
    get resultatequipes(){
        return this.$store.getters.resultatequipes
    }
    get detailRencontre(){
        return this.$store.getters.detailRencontre
    }
    get currentPhase(){
        return this.$store.getters.currentPhase
    }
    get selectedEquipe(){
        return this.$store.getters.selectedEquipe
    }
    get selectedResultat(){
        return this.$store.getters.selectedResultat
    }
    get joueurParties(){
        return this.$store.getters.joueurParties
    }
    get message(){
        return this.$store.getters.message
    }
}
/*
export default {
    components:{
        VuePerfectScrollbar,
        'base-card':BaseCard,
        //'profile-card':ProfileCard,
        'club-card':ClubCard,
        'joueur-card':JoueurCard,
        'equipes-card':EquipeCard,
        'classement-equipes-card':ClassementEquipesCard,
        'resultat-equipe':ResultatEquipe,
        'detail-rencontre':DetailRencontre,
        'joueur-parties':JoueurParties,
        'loader':Loader
    },
    data: () => ({
        scrollSettings: {
            maxScrollbarLength: 160
        },
        showResultatSheet:false,
        showDetailRencontre:false,
        showParties:false
    }),
    methods:{
        
        wantShowResultat(id){
            this.$store.dispatch('selectEquipe',id);
            
            this.showResultatSheet=true
        },
        wantShowDetailRencontre(rencontre){
            this.$store.dispatch('getDetailRencontre',rencontre.lien)
            this.showDetailRencontre=true
        },
        wantShowParties(){
            this.showParties=true
        },
    },
    computed:{
        user(){
            return this.$store.getters.user
        },
        club(){
            return this.$store.getters.club
        },
        joueur(){
            return this.$store.getters.joueur
        },
        equipes(){
            return this.$store.getters.equipes
        },
        equipesCurrentPhase(){
            return this.$store.getters.equipesCurrentPhase
        },
        classementequipes(){
            return this.$store.getters.classementequipes 
        },
        resultatequipes(){
            return this.$store.getters.resultatequipes
        },
        detailRencontre(){
            return this.$store.getters.detailRencontre
        },
        currentPhase(){
           return this.$store.getters.currentPhase
        },
        selectedEquipe(){
            return this.$store.getters.selectedEquipe
        },
        selectedResultat(){
            return this.$store.getters.selectedResultat
        },
        joueurParties(){
            return this.$store.getters.joueurParties
        }
    },
    watch:{
        user(newval){
            this.$store.dispatch('getClubInfo',{numero:newval.club})
            this.$store.dispatch('getJoueurInfo',{licence:newval.licence})
            this.$store.dispatch('getJoueurParties',{licence:newval.licence})
            
        },
        club(newval){
            this.$store.dispatch('getEquipes',{numero:newval.numero})
        },
        equipes(newval){
            _.forEach(newval,equipe=>{
                this.$store.dispatch('getClassementEquipe',{ equipe:equipe})
                this.$store.dispatch('getResultatEquipe',{ equipe:equipe})
            })
            
        },
        joueurParties(newval){
            
        }
    },
    mounted(){
        if(this.user){
            this.$store.dispatch('getClubInfo',{numero:this.user.club})
            this.$store.dispatch('getJoueurInfo',{licence:this.user.licence})
            this.$store.dispatch('getJoueurParties',{licence:this.user.licence})
        }
    }
}*/
</script>


