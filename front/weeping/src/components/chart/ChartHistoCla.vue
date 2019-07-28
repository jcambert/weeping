<template>
    <v-widget title="Historique classement" content-bg="white">
        <template slot="widget-header-action">
            <v-btn icon @click="refresh" :disabled="refreshing" :loading="refreshing">
                <v-icon class="text--secondary">refresh</v-icon>
            </v-btn>

        </template>
        <div slot="widget-content">
            <e-chart v-if="Object.keys(histo).length>0"
                :path-option="[
                ['title.text',''],
                ['legend.data',['Points']],
                ['xAxis',{data:xAxisData}],
                ['yAxis.min',min],
                ['series',[{
                    name: 'Points',
                    type: 'line',
                    data: seriesData
                }]]
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
        licence:{
            type:String,
            required:true
        }
    },
    watch:{
        licence:function(newv){
            this.$store.dispatch('getJoueurHistoriqueClassement',{licence:newv})
        }
    }
})
export default class ChartHistoCla extends Vue{
    get refreshing(){
        var res= this.$store.getters.loaders.joueurhistocla
        //console.log('refreshing ',res)
        return res
    }
    get histo(){
        return this.$store.getters.joueurHistoriqueClassement
    }
    get xAxisData(){
        
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
        //console.log(res)
        return res;
    }
    get seriesData(){
        var res=[]
        _.forEach(this.histo.histo,h=>{
            res.push(h.point)
        })
        if(this.histo.detail){
            res.push(this.histo.detail.licence.point)
        }
        //console.log(res)
        return res
    }
   
   get min(){
       return _.min(this.seriesData)-10
   }
    refresh(){
        if(this.licence)
            this.$store.dispatch('getJoueurHistoriqueClassement',{licence:this.licence})
    }
    mounted(){
        this.refresh()
    }
}
</script>

<style>

</style>
