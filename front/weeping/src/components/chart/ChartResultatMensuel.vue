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
        refreshing:function(newv){
            this.options={
                'xAxis':{
                        data:null,
                    },
                'series':null
            };
            if(newv){
                this.options={
                    'xAxis':{
                        data:this.datas.xaxisdata,
                    },
                    'series':[
                        {
                            name:'Victoire A.',
                            type:'bar',
                            stack:'a',
                            color:'#0F0',
                            label: {
                                show: true,
                                color:'#000'
                            },
                            data: this.datas.sets['Victoire A.']
                        },
                        {
                            name:'Victoire N.',
                            type:'bar',
                            stack: 'a',
                            color:'#080',
                            label: {
                                    show: true,
                            },
                            data:this.datas.sets['Victoire N.']
                        },
                        {
                            name:'Defaite N.',
                            type:'bar',
                            stack: 'a',
                            color:'#800',
                            label: {
                                show: true,
                            },
                            data:this.datas.sets['Defaite N.']
                        },
                        {
                            name:'Defaite A.',
                            type:'bar',
                            stack: 'a',
                            color:'#f00',
                            label: {
                                    show: true,
                                    
                                
                            },
                            data:this.datas.sets['Defaite A.']
                        },              
                    ]
                }
            }
        }
    }
})
export default class ChartResultatMensuel extends Vue{
    months=['','Jan','Fev','Mar','Avr','Mai','Juin','Juil','Aout','Sept','Oct','Nov','Dec']
    options={}
    get datas(){
        var xaxisdata=[]
        var sets={'Victoire A.':[],'Victoire N.':[],'Defaite N.':[],'Defaite A.':[]}
        var d=this.dataSeries
        console.log(d)
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
        return this.$store.getters.joueurPartiesMysql[this.licence]
    }

    get refreshing(){
        return this.$store.getters.loaders.joueurpartiesmysql
    }

    get dataSeries(){
        return this.partiesMensuelNombreVD(this.points)
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
