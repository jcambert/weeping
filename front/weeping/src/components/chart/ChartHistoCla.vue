<template>
    <v-widget title="Historique classement" content-bg="white">
        <template slot="widget-header-action">
            <v-btn icon @click="refresh(true)" :disabled="refreshing" :loading="refreshing">
                <v-icon class="text--secondary">refresh</v-icon>
            </v-btn>

        </template>
        <div slot="widget-content">
            <e-chart ref="chart"  :options="options"
                :path-option="[
                ['title.text',''],
                ['legend.data',['Points']],
                ['xAxis',{data:xAxisData}],
                ['yAxis.min',min],
                
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
            this.$store.dispatch('getJoueurHistoriqueClassement',{licence:newv,force:true})
        },
        histo:function(newv){
           // console.log('histo has changed')
        },
        refreshing:function(newv){
            console.log(newv)
            if(newv){
                this.options=
                    {'series':
                        [
                            {
                                name: 'Points',
                                type: 'line',
                                data: this.seriesData
                            }
                        ],
                        'xAxis':{data:this.xAxisData},
                        'yAxis':{min:this.min}
                    }
            }

        }

    }
})
export default class ChartHistoCla extends Vue{
    options={}
    get refreshing(){
        var res= this.$store.getters.loaders.joueurhistocla
        //console.log('refreshing ',res)
        return res
    }
    get joueur(){
        return this.$store.getters.joueursTT[this.licence]
    }

    get parties(){
        return this.$store.getters.joueurPartiesMysql[this.licence]
    }

    get histo(){
        return this.$store.getters.joueurHistoriqueClassement[this.licence]
    }
    get xAxisData(){
        if(!this.histo)return
        var res=[]
        var ss
        _.forEach(this.histo.histo,h=>{
            ss=h.saison.split(' ')
            res.push( (h.phase =="1"?"Juil ":"Janv ").concat(h.phase=="1"?ss[1]:ss[3]))
        })
        if(this.histo.detail){
            var last=_.last(this.histo.histo)
            res.push( (last.phase=="2"?"Juil ":"Janv ").concat(last.phase=="2"?ss[1]:ss[3]))
        }
        console.log(res)
        return res;
    }
    get seriesData(){
        if(!this.histo)return
        var res=[]
        _.forEach(this.histo.histo,h=>{
            res.push(h.point)
        })
        if(this.histo.detail){
            res.push(this.histo.detail.licence.point)
        }
        return res
    }
   
    get min(){
        if(!this.histo)return 0
        return _.min(this.seriesData)-10
    }

    refresh(force=false){
        this.$store.dispatch('getJoueurHistoriqueClassement',{licence:this.licence,force:force})
    }
    mounted(){
        this.refresh()
    }
}
</script>

<style>

</style>
