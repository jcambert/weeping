<template>
    <v-card>
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
            <v-list-tile href="#" @click="talkme()">
                <v-list-tile-action>
                    <v-icon color="primary">phone</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{club.telcor}}</v-list-tile-title>
                    <v-list-tile-sub-title>Telephone</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile href="#">
                <v-list-tile-action>
                    <v-icon color="primary">location_on</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{club.nomsalle}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{club.adressesalle1}} {{club.codepsalle}} {{club.villesalle}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider inset v-if="club.web.length>0"></v-divider>
            <v-list-tile href="#"  v-if="club.web.length>0">
                <v-list-tile-action>
                    <v-icon  color="primary">cloud</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{club.web}}</v-list-tile-title>
                    
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
        club:{
            type:Object,
            required:true
        }
    },
    data: () => ({
        
    }),
    methods: {
      talkme(){
          alert('talk to '+club.prenomcor)
      }
    },
}
</script>

<style>

</style>
