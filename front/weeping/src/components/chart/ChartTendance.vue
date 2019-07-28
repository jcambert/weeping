<template>
    <v-widget title="Tendance" content-bg="white">
        <template slot="widget-header-action">
            <v-btn icon @click="refresh" :disabled="refreshing" :loading="refreshing">
                <v-icon class="text--secondary">refresh</v-icon>
            </v-btn>

        </template>
        <div slot="widget-content">
            <e-chart v-if="parties.length>0"
                :path-option="[
                ['tooltip.trigger','item'],
                ['tooltip.formatter','{a} <br/>{b}: {c} ({d}%)'],
                ['title.text',''],
                ['legend.data',['Victoire A.','Victoire N.','Defaite N.','Defaite A.','Points Vict A.','Points Vict N.','Points Def N.','Points Def A.']],
                ['legend.x','center'],
                ['legend.y','bottom'],
                ['xAxis.show',false],
                ['yAxis.show',false],
                ['series',[
                    {
                        name: 'Nombre',
                        type: 'pie',
                        radius: ['10%', '30%'],
                        label: {
                            normal: {
                                formatter: '{b}:{c} pct:{d}%  ',
                            }
                        },
                        //data: [{value:2,name:'Victoire A.'},{value:41,name:'Victoire N.'},{value:6,name:'Defaite N.'},{value:3,name:'Defaite A.'}]
                        data:dataNombreVD
                    },
                    {
                        name: 'Points',
                        type:'pie',
                        selectedMode: 'single',
                        radius: ['40%', '60%'],
                        label: {
                        normal: {
                            formatter: '{b}:{c} pct:{d}%  ',
                            }
                        },
                        //data:[{value:27,name:'Points Vict A.'},{value:179,name:'Points Vict N.'},{value:27,name:'Points Def N.'},{value:24,name:'Points Def A.'}]
                        data:dataPointsVD
                    }
                    ]
                    ]
                ]"
             
            >
            </e-chart>   
        </div>
    </v-widget>
</template>

<script>
import Vue from 'vue'
import Component from "vue-class-component";
import widget from '@/components/widget.vue';
import echart from '@/components/chart/echart';

@Component({
    components:{
        'v-widget':widget,
        'e-chart':echart
    },
    props:{
        
    },
    watch:{
        licence:function(newv){
            this.$store.dispatch('getJoueurPartiesMysql',{licence:newv})
        }
    }
})
export default class ChartTendance extends Vue{
    
    get classement(){
        return this.$store.getters.classement
    }
    get parties(){
        return this.$store.getters.joueurPartiesMysql
    }
    get refreshing(){
        return this.$store.getters.loaders.joueurpartiesmysql
    }

    get licence(){
        if(this.$store.getters.joueur)
            return this.$store.getters.joueur.licence
        return ""
    }

    get dataNombreVD(){
        return this.$store.getters.partiesNombreVD
    }

    get dataPointsVD(){
        return this.$store.getters.partiesPointsVD
        
    } 


    refresh(){
        if(this.licence)
            this.$store.dispatch('getJoueurPartiesMysql',{licence:this.licence})
    }
    mounted(){
        this.refresh()
    }
}
</script>

<style>

</style>
