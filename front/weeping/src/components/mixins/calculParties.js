

var  calculatePartiesPointsVD=function (licence){
    var res=[]
    res.push({name:'Points Vict A.',value:Math.abs( _.reduce(_.map(this.partiesVictoiresAnormales_[licence],'pointres'),(a,b)=>a+b,0))})
    res.push({name:'Points Vict N.',value:Math.abs(_.reduce(_.map(this.partiesVictoiresNormales_[licence],'pointres'),(a,b)=>a+b,0))})
    res.push({name:'Points Def N.',value:Math.abs(_.reduce(_.map(this.partiesDefaiteNormales_[licence],'pointres'),(a,b)=>a+b,0))})
    res.push({name:'Points Def A.',value:Math.abs(_.reduce(_.map(this.partiesDefaitesAnormales_[licence],'pointres'),(a,b)=>a+b,0))})

    return res
}


var calculatePartiesNombreVD=function(pva,pvn,pda,pdn){
    var res=[]
    res.push({name:'Victoire A.',value:pva})
    res.push({name:'Victoire N.',value:pvn})
    res.push({name:'Defaite N.',value:pdn})
    res.push({name:'Defaite A.',value:pda})
    
    return res
}


var calculatePartieMensuelNombreVD=function(parties,pva,pvn,pda,pdn){
    var res=[]
    if(parties.length==0)return {min:0,max:0}
    var fn=function(ar){
        var aa=_.groupBy( ar,p=>p.moisannee)
        _.forEach(aa,(a,index)=>{
            //console.log(a.length)
            aa[index]=a.length
        })
        return aa
    }


    
    var min= _.minBy(parties,p=>p.moisannee)['moisannee']
    var max= _.maxBy(parties,p=>p.moisannee)['moisannee']

    var ret= {min:min,max:max,
        'Victoire A.': fn(pva),
        'Victoire N.':fn(pvn),
        'Defaite N.':fn( pdn),
        'Defaite A.':fn(pda)
    }
    return ret
}


var calculatePartiesVictoiresNormales=function(parties){
    var res=_.filter(parties,partie=>partie.advclaof<=this.classement && partie.vd=="V")
    return res
}


var calculatePartiesVictoiresAnormales=function(parties){
    var res=_.filter(parties,partie=>partie.advclaof>this.classement && partie.vd=="V")
    return res
}


var calculatePartiesDefaitesNormales=function(parties){
    var res=_.filter(parties,partie=>partie.advclaof>=this.classement && partie.vd=="D")
    return res
}

var calculatePartiesDefaitesAnormales=function(parties){
    var res=_.filter(parties,partie=>partie.advclaof<this.classement && partie.vd=="D")
    return res
}



var classement=function(point){
    var c=parseInt(this.point)
    return Math.trunc(c/100)
}

export default {
    props:{
        licence:{
            type:String,
            required:true
        }
    },
    data:()=>{
        return {

        }
    },
    methods:{
        /*get joueur(){
            return this.$store.getters.joueursTT[this.licence]
        },
        get parties(){
            return this.$store.getters.joueurPartiesMysql[this.licence]
        },*/
        partiesDefaiteNormales(){
            return calculatePartiesDefaitesNormales(this.parties)
        },
        partiesDefaitesAnormales(){
            return calculatePartiesDefaitesAnormales(this.parties)
        },
        partiesVictoiresNormales(){
            return calculatePartiesVictoiresNormales(this.parties)
        },
        partiesVictoiresAnormales(){
            return calculatePartiesVictoiresAnormales(this.parties)
        },
        partiesMensuelNombreVD(){
            return calculatePartieMensuelNombreVD(
                this.parties,
                this.partiesVictoiresAnormales(),
                this.partiesVictoiresNormales(),
                this.partiesDefaitesAnormales(),
                this.partiesDefaiteNormales()
                )
        },
        partiesNombreVD(){
            return calculatePartiesNombreVD(
                this.partiesVictoiresAnormales().length,
                this.partiesVictoiresNormales().length,
                this.partiesDefaitesAnormales().length,
                this.partiesDefaiteNormales().length
                )
            
        },
        partiesPointsVD(){
            var res=[]
            res.push({name:'Points Vict A.',value:Math.abs( _.reduce(_.map(this.partiesVictoiresAnormales(),'pointres'),(a,b)=>a+b,0))})
            res.push({name:'Points Vict N.',value:Math.abs(_.reduce(_.map(this.partiesVictoiresNormales(),'pointres'),(a,b)=>a+b,0))})
            res.push({name:'Points Def N.',value:Math.abs(_.reduce(_.map(this.partiesDefaiteNormales(),'pointres'),(a,b)=>a+b,0))})
            res.push({name:'Points Def A.',value:Math.abs(_.reduce(_.map(this.partiesDefaitesAnormales(),'pointres'),(a,b)=>a+b,0))})
            
            return res
        },
        classement

        
        

    }
}