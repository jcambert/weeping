<template>
    <v-widget title="Resultats Mensuels" content-bg="white">
        <template slot="widget-header-action">
            <v-btn icon @click="refresh(true)" :disabled="refreshing" :loading="refreshing">
                <v-icon class="text--secondary">refresh</v-icon>
            </v-btn>

        </template>
        <div slot="widget-content">
            <e-chart v-if="parties.length>0"
                :path-option="[
                    ['xAxis.type','category'],
                    ['xAxis.data',datas.xaxisdata],
                    ['yAxis.type','value'],
                    ['legend.data',['Victoire A.','Victoire N.','Defaite N.','Defaite A.',]],
                    ['tooltip',{
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                    }],
                    ['series',[
                        {
                            name:'Victoire A.',
                            type:'bar',
                            stack:'a',
                            color:'#0F0',
                            label: {
                                show: true,
                                color:'#000'
                            },
                            data: datas.sets['Victoire A.']
                        },
                        {
                            name:'Victoire N.',
                            type:'bar',
                            stack: 'a',
                            color:'#080',
                            label: {
                                    show: true,
                            },
                            data:datas.sets['Victoire N.']
                        },
                        {
                            name:'Defaite N.',
                            type:'bar',
                            stack: 'a',
                            color:'#800',
                            label: {
                                show: true,
                            },
                            data:datas.sets['Defaite N.']
                        },
                        {
                            name:'Defaite A.',
                            type:'bar',
                            stack: 'a',
                            color:'#f00',
                            label: {
                                    show: true,
                                    
                                
                            },
                            data:datas.sets['Defaite A.']
                        },              
                    ]]
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
            this.$store.dispatch('getJoueurHistoriqueClassement',{licence:newv,force:true})
        }
    }
})
export default class ChartResultatMensuel extends Vue{
    months=['','Jan','Fev','Mar','Avr','Mai','Juin','Juil','Aout','Sept','Oct','Nov','Dec']
    get datas(){
        var xaxisdata=[]
        var sets={'Victoire A.':[],'Victoire N.':[],'Defaite N.':[],'Defaite A.':[]}
        var d=this.dataSeries
        var month=function(d){
            var ras=parseInt( (d+"").substring(2))
            return ras
        }
        var year=function(d){
            return Math.trunc(d/100)
        }
        for(var i=d.min;i<=d.max;i++){
            if(month(i)>12)i=i+88
            xaxisdata.push(`${this.months[month(i)]} `)
            _.forEach(sets,(s,index)=>{
                if(!_.isUndefined(d[index][i]))
                    s.push(d[index][i])
                else
                    s.push(0)
                //console.log(d[index][i])
                /*if(!_.isUndefined( d[index] && d[index][i]))
                    s.push(d[index][i])
                else    
                    s.push(0)*/
            })
        }
        //console.log(sets['Victoire A.'])
        return {xaxisdata:xaxisdata,sets:sets}
    }

    get joueur(){
        return this.$store.getters.joueursTT[this.licence]
    }
    
    get parties(){
        return this.joueur.parties_mysql
    }
    get refreshing(){
        return this.$store.getters.loaders.joueurpartiesmysql
    }

    get dataSeries(){
        return this.joueur.partiesMensuelNombreVD
    }
    refresh(force=false){
        this.$store.dispatch('getJoueurPartiesMysql',{licence:this.licence,force:force})
    }
    mounted(){ 
        this.refresh()
    }
}
</script>

<style>

</style>
