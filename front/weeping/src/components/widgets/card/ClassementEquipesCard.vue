<template>
    <v-card>
        <v-list   class="pa-0">
            <v-template v-for="(clt,index) in classement">
                <v-list-tile href="#"  :key="index">
                    <v-list-tile-action>
                        <v-icon color="primary">group</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{clt.equipe}}</v-list-tile-title>
                        
                    </v-list-tile-content>
                    <v-list-tile-action>
                        {{clt.pts}}
                    </v-list-tile-action>
                </v-list-tile>
                <v-divider inset></v-divider>
            </v-template>
        </v-list>
    </v-card>
</template>

<script>
export default {
     props:{
        classement:{
            type:Array, 
            required:true 
        }
    },
}
</script>

<style>

</style>
