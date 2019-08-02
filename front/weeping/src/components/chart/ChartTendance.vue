<template>
    <v-widget title="Tendance" content-bg="white">
        <template slot="widget-header-action">
            <v-btn icon @click="refresh" :disabled="refreshing" :loading="refreshing">
                <v-icon class="text--secondary">refresh</v-icon>
            </v-btn>

        </template>
        <div slot="widget-content">
            <e-chart  :options="options"
                :path-option="[
                    ['tooltip.trigger','item'],
                    ['tooltip.formatter','{a} <br/>{b}: {c} ({d}%)'],
                    ['title.text',''],
                    ['legend.data',['Victoire A.','Victoire N.','Defaite N.','Defaite A.','Points Vict A.','Points Vict N.','Points Def N.','Points Def A.']],
                    ['legend.x','center'],
                    ['legend.y','bottom'],
                    ['xAxis.show',false],
                    ['yAxis.show',false]
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
import calc from '@/components/mixins/calculParties';

@Component({
    components:{
        'v-widget':widget,
        'e-chart':echart
    },
    mixins:[calc],
    props:{
        
    },
    watch:{
        licence:function(newv){
            this.$store.dispatch('getJoueurPartiesMysql',{licence:newv})
        },
        refreshing:function(newv){
            if(newv){
                this.options={
                    'series':[
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
                            data:this.dataNombreVD
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
                            data:this.dataPointsVD
                        }
                    ]
                
                }
            }
            
        }
    }
})
export default class ChartTendance extends Vue{
    options={}
    get refreshing(){
        return this.$store.getters.loaders.joueurpartiesmysql
    }

    get dataNombreVD(){
        return this.partiesNombreVD()
    }

    get dataPointsVD(){
        return this.partiesPointsVD()
        
    } 

    get joueur(){
        return this.$store.getters.joueursTT[this.licence]
    }

    get parties(){
        return this.$store.getters.joueurPartiesMysql[this.licence]
    }

    refresh(force=false){
        this.$store.dispatch('getJoueurPartiesMysql',{licence:this.licence,force:force})
    }
    mounted(){
        //this.refresh()
    }
}
</script>

<style>

</style>
