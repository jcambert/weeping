<template>
    <v-card>
        <v-list   class="pa-0">
            <v-list-tile href="#" >
                   <v-list-tile-content></v-list-tile-content>
                    <v-list-tile-action>
                        <v-tooltip left>
                            <span slot="activator">{{currentKey.text}}</span>
                            <span>{{currentKey.tooltip}}</span>
                        </v-tooltip>
                    </v-list-tile-action>
                </v-list-tile>
                <v-divider inset></v-divider>
            <div v-for="(clt,index) in classement" :key="index" >
                <v-list-tile href="#" >
                    <v-list-tile-action>
                        <v-icon color="primary">group</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{clt.equipe}}</v-list-tile-title>
                        
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-tooltip left>
                            <span slot="activator">{{currentValue(clt)}}</span>
                            <span>{{currentKey.tooltip}}</span>
                        </v-tooltip>
                    </v-list-tile-action>
                </v-list-tile>
                <v-divider inset></v-divider>
            </div>
        </v-list>
    </v-card>
</template>

<script>
var key={
    points:{
        text:'Points',
        tooltip:'3pts/Victoire 2pts/Nul 1pt/Défaite',
        fields:['pts']
    },
    joues:{
        text:'Joués',
        tooltip:'Nombre de matchs jouées',
        fields:['joue']
    },
    vicnuldef:{
        text:'G N P',
        tooltip:'Match Gagnes/Nuls/Perdus',
        fields:['vic','nul','def']
    },
    pgpp:{
        text:'PG PP',
        tooltip:'Matchs gagnés / Matchs perdus',
        fields:['pg','pp']
    }
}

export default {
     props:{
        classement:{
            type:Array, 
            required:true 
        }
    },
    data: () => ({
        value:"",
        index:0,
        
    }),
    methods:{
        toggle(){
            this.index+=1
            if(this.index>= _.keys(key).length)
                this.index=0
        },
    currentValue(clt){
        var result=[]
        _.forEach(this.currentKey.fields,f=>result.push(clt[f]))
            return result.join(" ")
        }
    },
   
    computed:{
        currentKey(){
            var k=_.keys(key)[this.index]
            return key[k]
        },
        
    },
    created: function() {
        this.$parent.$on('more',this.toggle);
    }
}
</script>

<style>

</style>
