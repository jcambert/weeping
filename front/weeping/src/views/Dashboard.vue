<template>
    <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
        <div id="pageDashboard">
            <v-container grid-list-xl fluid>
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
                        <base-card :title="`Equipes Phase ${currentPhase}`"   v-if="equipes.length>0" >
                            <equipes-card :equipes="equipes" v-on:onshowresultat="wantShowResultat"></equipes-card>
                        </base-card>
                    </v-flex>
                    <v-flex lg4 sm12 xs12 v-for="(clt,key) in classementequipes" :key="key" >
                        <base-card :title="`Classement ${clt.division}`"   >
                            <classement-equipes-card :classement="clt.classement" ></classement-equipes-card>
                        </base-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        <resultat-equipe :resultats="selectedResultat" :show="showResultatSheet" v-if="selectedResultat" v-on:close="showResultatSheet=false" v-on:wantshowdetailrencontre="wantShowDetailRencontre"></resultat-equipe>
        <detail-rencontre :rencontre="detailRencontre" :show="showDetailRencontre" v-if="detailRencontre" v-on:close="showDetailRencontre=false" ></detail-rencontre>
        <joueur-parties :parties="joueurParties" v-if="joueurParties" :show="showParties" v-on:close="showParties=false"></joueur-parties>
    </vue-perfect-scrollbar>
</template>

<script>
import BaseCard from '@/components/widgets/card/BaseCard.vue'
import ProfileCard from '@/components/widgets/card/ProfileCard.vue'
import ClubCard from '@/components/widgets/card/ClubCard.vue'
import JoueurCard from '@/components/widgets/card/JoueurCard.vue'
import EquipeCard from '@/components/widgets/card/EquipesCard.vue'
import ClassementEquipesCard from '@/components/widgets/card/ClassementEquipesCard.vue'
import ResultatEquipe from '@/components/widgets/bottomsheet/ResultatEquipe.vue'
import DetailRencontre from '@/components/widgets/bottomsheet/DetailRencontre.vue'
import JoueurParties from '@/components/widgets/bottomsheet/JoueurParties.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
export default {
    components:{
        VuePerfectScrollbar,
        'base-card':BaseCard,
        'profile-card':ProfileCard,
        'club-card':ClubCard,
        'joueur-card':JoueurCard,
        'equipes-card':EquipeCard,
        'classement-equipes-card':ClassementEquipesCard,
        'resultat-equipe':ResultatEquipe,
        'detail-rencontre':DetailRencontre,
        'joueur-parties':JoueurParties
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
            //_.forEach(this.equipes,equipe=>equipe.selected=false)
            console.log("want show resultat for ",id)
            //equipe.selected=true
            this.showResultatSheet=true
        },
        wantShowDetailRencontre(rencontre){
           // alert('wantShowDetailRencontre')
           // console.log(rencontre)
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
           // console.log("new user:",newval)
            this.$store.dispatch('getClubInfo',{numero:newval.club})
            this.$store.dispatch('getJoueurInfo',{licence:newval.licence})
            this.$store.dispatch('getJoueurParties',{licence:newval.licence})
            
        },
        club(newval){
            this.$store.dispatch('getEquipes',{numero:newval.numero})
        },
        equipes(newval){
           // console.log('equipes')
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
           // console.log(this.user.club)
            this.$store.dispatch('getClubInfo',{numero:this.user.club})
            this.$store.dispatch('getJoueurInfo',{licence:this.user.licence})
            this.$store.dispatch('getJoueurParties',{licence:this.user.licence})
        }
    }
}
</script>


