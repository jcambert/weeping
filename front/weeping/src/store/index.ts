import Vue from 'vue'
import Vuex, { StoreOptions, Store,Module as Module_ } from 'vuex'
import { Module, VuexModule,Mutation,Action,getModule} from 'vuex-module-decorators'
//import createPersistedState from './plugins/persist'
import VuexPersistence from 'vuex-persist'
import  {User,ClubInfo,UserInfo,JoueurInfo} from './modules/app'
import * as _ from 'lodash'
Vue.use(Vuex);
export interface IRootState {
    //app:IAppState
    app:ApplicationStore
}

/*export class EStore<S> extends Vuex.Store<S> {
    constructor(options: StoreOptions<S>){
        super(options)
    }
    public $vue?:Vue;
}*/
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules:['app']
  })

interface ObjectLiteral {
    [key: string]: Array<any>;
  }
interface IPartieMensuelNombreVD{
    [key: string]: any;
}

interface IClassement{
    [key: string]: Number;
}
const store = new Store<IRootState>({/*plugins:[vuexLocal.plugin]*/});


export interface ILoaders{
    [key: string]: boolean;
}

export interface IHistorique {
    histo?:Array<any>
    detail?:{}
}

export interface IJoueurPartie{
    advclaof:number
    advlic:string
    advnompre:string
    advsexe:string
    codechamp:string
    coefchamp:number
    date:string
    idpartie:string
    licence:string
    mois:number
    moisannee:number
    numjour:string
    pointres:number
    vd:string
}
export interface IJoueur{
    club:string,
    echelon:string,
    licence:string,
    nclub:string,
    nom:string,
    place:string,
    point:number,
    prenom:string,
    sexe:string,
}
export interface Joueurs{
    [key: string]: IJoueur;
}

export interface IPartieMysql{

}

export interface PartiesMysql{
    [key:string]:Array<IPartieMysql>
}

@Module({ dynamic: true, store:store,name:'app'})
 class ApplicationStore extends VuexModule /*implements IAppState*/{
    joueurs__:Joueurs={}
    joueur_parties_mysql__:PartiesMysql={}
    histo_cla__:ObjectLiteral={}

    user_: User | undefined=undefined
    userinfo_: UserInfo |undefined=undefined
    clubinfo_:ClubInfo | undefined=undefined
    joueurinfo_:JoueurInfo | undefined=undefined
    equipes_:Array<any>=[]
    joueurs_:Array<any>=[]
    classement_:Array<any>=[]
    resultat_:Array<any>=[]
    detailRencontre_:{}|undefined=undefined
    joueurparties_:Array<any>=[]
    joueur_parties_mysql_:ObjectLiteral={}
    /*partiesDefaitesAnormales_:ObjectLiteral={}
    partiesDefaiteNormales_:ObjectLiteral={}
    partiesVictoiresAnormales_:ObjectLiteral={}
    partiesVictoiresNormales_:ObjectLiteral={}
    partieMensuelNombreVD_:IPartieMensuelNombreVD={}
    partiesNombreVD_:ObjectLiteral={}
    partiesPointsVD_:ObjectLiteral={}*/
    joueursClassement_:IClassement={}
    apis_:Array<any>=[]
    loading_:boolean=false
    error_=null
    loaders_:ILoaders={clubinfo:false,joueurinfo:false,equipes:false,joueurs:false,classementequipe:false,detailrencontre:false,joueurparties:false,joueurhistocla:false,joueurpartiesmysql:false}
    searchTermResponse_:any[]=[]
    message_={}
    isInDev_=false
    api_result_={}
    histo_cla_:IHistorique={}
    categorieAge_= {
        'N': { value: 'Non determiné' },
        'P': { value: 'Poussin', desc: 'jeunes ayant 8 ans au plus' },
        'B1': { value: 'Benjamin 1', desc: 'jeunes agés de 8 à 9 ans' },
        'B2': { value: 'Benjamin 2', desc: 'jeunes agés de 9 à 10 ans' },
        'M1': { value: 'Minime 1', desc: 'jeunes agés de 10 à 11 ans' },
        'M2': { value: 'Minime 1', desc: 'jeunes agés de 11 à 12 ans' },
        'C1': { value: 'Cadet 1', desc: 'jeunes agés de 12 à 13 ans' },
        'C2': { value: 'Cadet 2', desc: 'jeune agés de 13 à 14 ans' },
        'J1': { value: 'Junior 1', desc: 'jeunes agés de 14 à 15 ans' },
        'J2': { value: 'Junior 2', desc: 'jeunes agés de 15 à 16 ans' },
        'J3': { value: 'Junior 3', desc: 'jeunes agés de 16 à 17 ans' },
        'S': { value: 'Senior', desc: 'adultes agés de 18 à 39 ans' },
        'V1': { value: 'Veteran 1', desc: 'adultes agés de 40 à 49 ans' },
        'V2': { value: 'Veteran 2', desc: 'adultes agés de 50 à 59 ans' },
        'V3': { value: 'Veteran 3', desc: 'adultes agés de 60 à 69 ans' },
        'V4': { value: 'Veteran 4', desc: 'adultes agés de 70 à 79 ans' },
        'V5': { value: 'Veteran 1', desc: 'adultes agés de plus de 80 ans' }
    }

    constructor(module: any){
        super(module)
        //console.log('ApplicationStore created')
       // this.loaders_={clubinfo:false,joueurinfo:false,equipes:false,classementequipe:false,detailrencontre:false,joueurparties:false}
        
    }

    @Action({})
    public clearApplication(){
        this.context.commit('SET_ERROR',null)
        this.context.commit('SET_USERINFO',undefined)
        this.context.commit('SET_USER',undefined)
        this.context.commit('SET_CLUB_INFO',undefined)
        this.context.commit('SET_DETAIL_RENCONTRE',undefined)
        this.context.commit('SET_EQUIPES',[])
        this.context.commit('SET_JOUEURS',[])
        this.context.commit('SET_JOUEUR_PARTIES',[])
        this.context.commit('CLEAR_CLASSEMENT_EQUIPE')
        this.context.commit('CLEAR_RESULTAT_EQUIPE')
        this.context.commit('SET_SEARCHTERM_RESPONSE',[])
        this.context.commit('SET_MESSAGE',{})
        return ""
    }

    @Mutation
    SET_LOADING(value:boolean){
        this.loading_=value;
    }

    @Action({commit:'SET_LOADING'})
    setLoading(value:boolean){
        return value;
    }

    public get loading(){
        return this.loading_
    }

    @Mutation
    SET_LOADER(loaders:{}){
        _.forEach(loaders,(value:boolean,key:string)=>{
            this.loaders_[key]=value
        })
    }

    get loaders(){
        return this.loaders_;
    }

    @Mutation
    SET_ERROR(value:any){
        this.error_=value;
    }

    @Action({commit:'SET_ERROR'})
    setError(value:any){
        return value
    }

    @Action({commit:'SET_ERROR'})
    clearError(){
        return null
    }

    public get error(){
        return this.error_
    }

    @Mutation
    SET_USER(value:User){
        //console.log('set new user',value)
        this.user_=value
        
    }

    @Action({commit:'SET_USER'})
    setUser(user:User){
        return user
    }

    
    public get user():User|undefined{
        return this.user_
    }
    
    @Mutation
    ADD_JOUEUR(joueur:IJoueur){
        this.joueurs__[joueur.licence]=joueur
        
    }
    @Action({commit:'ADD_JOUEUR'})
    public addJoueur(joueur:IJoueur){
        //console.log(joueur)
        return joueur
    }

    get joueursTT():Joueurs{
        return this.joueurs__
    }


    @Mutation
    SET_USERINFO(value:UserInfo){
        this.userinfo_=value
    }

    @Action({commit:'SET_USERINFO'})
    setUserInfo(userinfo:UserInfo){
        return userinfo
    }
    
    public get userInfo():UserInfo|undefined{
        return this.userinfo_;
    }

    @Mutation
    NONE(value:any){

    }

    @Action({})
    public userLogin(payload:any){
        this.context.commit('SET_LOADING',true)
        this.context.commit('SET_ERROR',null)
        window.spid.login(payload.licence,payload.prenom)
        .then((resp:any)=>{
            this.context.commit('SET_LOADING',false)
            this.context.commit('SET_USER',resp.licencie)
            this.context.commit('ADD_JOUEUR',resp.licencie)
            this.context.commit('SET_USERINFO',resp.info)
            //console.log(resp);
            //console.log("YOU ARE LOGGED");
            window.getApp.$emit('APP_LOGIN_SUCCESS',resp);
        })
        .catch(error=>{
           // console.log(error);
            this.context.commit('SET_LOADING',false)
            this.context.commit('SET_ERROR',error)
            window.getApp.$emit('APP_REQUEST_ERROR',error);
            
        })
        return "";
    }


    @Mutation
    SET_CLUB_INFO(club:ClubInfo){
        //console.log('try mutate clubinfo',club)
        this.clubinfo_=club
        //console.log(' mutated clubinfo',this.clubinfo_)
    }
    public get club():ClubInfo|undefined{
        return this.clubinfo_
    }
    @Action({})
    public getClubInfo(payload:any){
        this.context.commit('SET_LOADING',true)
        this.context.commit('SET_LOADER',{clubinfo:true})
        this.context.commit('SET_ERROR',null)
        window.spid.clubInfo(payload.numero)
            .then( (resp:any)=>{
                //console.log(resp);
                
                this.context.commit('SET_CLUB_INFO',resp.club);
                this.context.commit('SET_LOADING',false);
                this.context.commit('SET_LOADER',{clubinfo:false})
               //return resp.club
            })
            .catch(error=>{
                this.context.commit('SET_LOADING',false)
                this.context.commit('SET_LOADER',{clubinfo:false})
                this.context.commit('SET_ERROR',error)
                window.getApp.$emit('APP_REQUEST_ERROR',error);
            })
        //return "";
    }

    @Mutation
    SET_JOUEUR_INFO(joueur:any){
        //console.log('try mutate joueurinfo',joueur)
        this.joueurinfo_=joueur
    }
    public get joueur(){
        return this.joueurinfo_
    }
    @Action({})
    public getJoueurInfo(payload:any){
        this.context.commit('SET_LOADING',true)
        this.context.commit('SET_LOADER',{joueurinfo:true})
        this.context.commit('SET_ERROR',null)
        window.spid.joueurInfo(payload.licence)
            .then( (resp:any)=>{
                this.context.commit('SET_JOUEUR_INFO',resp.joueur);
                this.context.commit('SET_LOADING',false);
                this.context.commit('SET_LOADER',{joueurinfo:false})
            })
            .catch(error=>{
                this.context.commit('SET_LOADING',false)
                this.context.commit('SET_LOADER',{joueurinfo:false})
                this.context.commit('SET_ERROR',error)
                window.getApp.$emit('APP_REQUEST_ERROR',error);
            })
    }

    

    public get categorieAge(){
        return this.categorieAge_
    }

    @Mutation
    SET_EQUIPES(equipes:any){
        
        this.equipes_.splice(0,this.equipes_.length)
        _.forEach(equipes,(equipe,index)=>{
            equipe.id=index
            equipe.selected=false
            this.equipes_.push(equipe)
        })
        
    }
    public get equipes(){
        return this.equipes_
    }

    @Mutation
    SELECT_EQUIPE(id:any){
        _.forEach(this.equipes_,e=>{
            e.selected=false
           // console.log(e)
        })
        let equipe=_.find(this.equipes_,(e:any):boolean=>{return e.id==id})
        //console.log(equipe)
        if(!_.isUndefined(equipe))
            equipe.selected=true
        //console.log(this.equipes_)
    }
    public get selectedEquipe(){
        return _.find(this.equipes_,e=>e.selected)
    }

    public get selectedResultat(){
        if(_.isUndefined(this.selectedEquipe))return undefined
        return _.find(this.resultat_,r=>{return r.equipeid==this.selectedEquipe.id})
    }

    @Action({commit:'SELECT_EQUIPE'})
    public selectEquipe(payload:any){
        //console.log(payload.id)
        return payload.id
    }

    @Action({})
    public getEquipes(payload:any){
        this.context.commit('CLEAR_CLASSEMENT_EQUIPE')
        this.context.commit('CLEAR_RESULTAT_EQUIPE')
        this.context.commit('SET_LOADING',true)
        this.context.commit('SET_LOADER',{equipes:true})
        this.context.commit('SET_ERROR',null)
        window.spid.equipes(payload.numero,this.currentPhase.toString())
            .then( (resp:any)=>{
                this.context.commit('SET_EQUIPES',resp);
                this.context.commit('SET_LOADING',false);
                this.context.commit('SET_LOADER',{equipes:false})
            })
            .catch(error=>{
                this.context.commit('SET_LOADING',false)
                this.context.commit('SET_LOADER',{equipes:false})
                this.context.commit('SET_ERROR',error)
                window.getApp.$emit('APP_REQUEST_ERROR',error);
            })
    }

    @Mutation
    SET_JOUEURS(joueurs:[]){
        this.joueurs_.splice(0,this.joueurs_.length)
        _.forEach(joueurs,(joueur:any)=>{
            joueur.point=parseInt(joueur.point)
            this.joueurs_.push(joueur)
        })
    }
    get joueurs(){
        return this.joueurs_
    }
    @Action({})
    public getJoueurs(payload:any){
        this.context.commit('SET_JOUEURS',[])
        this.context.commit('SET_LOADING',true)
        this.context.commit('SET_LOADER',{joueurs:true})
        this.context.commit('SET_ERROR',null)
        window.spid.joueurs({club:payload.numero})
            .then( (resp:any)=>{
                this.context.commit('SET_JOUEURS',resp);
                this.context.commit('SET_LOADING',false);
                this.context.commit('SET_LOADER',{joueurs:false})
            })
            .catch(error=>{
                this.context.commit('SET_LOADING',false)
                this.context.commit('SET_LOADER',{joueurs:false})
                this.context.commit('SET_ERROR',error)
                window.getApp.$emit('APP_REQUEST_ERROR',error);
            })
    }
    public get currentPhase():number{
        let m=new Date().getMonth()+1
        return m<=6?2:1
    }

    @Mutation
    ADD_CLASSEMENT_EQUIPE(payload:any){
        //_.forEach(payload.clts,clt=>clt.equipeinfo=payload.equipe);
        this.classement_.push({equipeid:payload.equipe.id,division:payload.equipe.libdivision, classement:payload.clts})
    }
    @Mutation
    CLEAR_CLASSEMENT_EQUIPE(){
        this.classement_.splice(0,this.classement_.length)
    }
    public get classementequipes(){
        return this.classement_
    }
    @Action({})
    getClassementEquipe(payload:any){
        this.context.commit('SET_LOADING',true)
        this.context.commit('SET_LOADER',{classementequipe:true})
        this.context.commit('SET_ERROR',null)
        window.spid.classementEquipe(payload.equipe.liendivision)
            .then((resp:any)=>{
                this.context.commit('ADD_CLASSEMENT_EQUIPE',{clts:resp,equipe:payload.equipe})
                this.context.commit('SET_LOADING',false)
                this.context.commit('SET_LOADER',{classementequipe:false})
                
            })
            .catch(error=>{
                this.context.commit('SET_LOADING',false)
                this.context.commit('SET_LOADER',{classementequipe:false})
                this.context.commit('SET_ERROR',error)
                window.getApp.$emit('APP_REQUEST_ERROR',error);
            })

    }

    @Mutation
    ADD_RESULTAT_EQUIPE(payload:any){
       // _.forEach(payload.resultat,resultat=>resultat.equipeinfo=payload.equipe);
       this.resultat_.push({equipeid:payload.equipe.id,division:payload.equipe.libdivision, resultat:payload.resultat})
    }
    @Mutation
    CLEAR_RESULTAT_EQUIPE(){
        this.resultat_.splice(0,this.resultat_.length)
    }
    public get resultatequipes(){
        return this.resultat_
    }

    @Action({})
    getResultatEquipe(payload:any){
        this.context.commit('SET_LOADING',true)
        this.context.commit('SET_LOADER',{resultatequipe:true})
        this.context.commit('SET_ERROR',null)
        window.spid.resultatEquipe(payload.equipe.liendivision)
            .then((resp:any)=>{
                this.context.commit('ADD_RESULTAT_EQUIPE',{resultat:resp,equipe:payload.equipe})
                this.context.commit('SET_LOADING',false)
                this.context.commit('SET_LOADER',{resultatequipe:false})
                
            })
            .catch(error=>{
                this.context.commit('SET_LOADING',false)
                this.context.commit('SET_LOADER',{resultatequipe:false})
                this.context.commit('SET_ERROR',error)
                window.getApp.$emit('APP_REQUEST_ERROR',error);
            })
    }

    @Mutation
    SET_DETAIL_RENCONTRE(payload:any){
        this.detailRencontre_=payload
    }

    public get detailRencontre():{}|undefined{
        return this.detailRencontre_
    }

    @Action({})
    getDetailRencontre(payload:any){
        //console.log(payload)
        this.context.commit('SET_LOADING',true)
        this.context.commit('SET_ERROR',null)
        this.context.commit('SET_LOADER',{detailrencontre:true})

        window.spid.detailRencontre(payload)
            .then((resp:any)=>{
                this.context.commit('SET_DETAIL_RENCONTRE',resp)
                this.context.commit('SET_LOADING',false)
                this.context.commit('SET_LOADER',{detailrencontre:false})
            })
            .catch(error=>{
                this.context.commit('SET_LOADING',false)
                this.context.commit('SET_LOADER',{detailrencontre:false})
                this.context.commit('SET_ERROR',error)
                window.getApp.$emit('APP_REQUEST_ERROR',error);
            })
    }
    @Mutation
    SET_JOUEUR_PARTIES(payload:any){
        this.joueurparties_.splice(0,this.joueurparties_.length)
        if(_.isUndefined(payload))
            payload=[]
        _.forEach(payload,
            partie=>{
                
                this.joueurparties_.push(partie)
            })
        this.joueurparties_=payload
    }

    public get joueurParties(){
        return this.joueurparties_
    }

    @Action({})
    getJoueurParties(payload:any){
        this.context.commit('SET_LOADING',true)
        this.context.commit('SET_ERROR',null)
        this.context.commit('SET_LOADER',{joueurparties:true})
        this.context.commit('SET_JOUEUR_PARTIES',[])
        
        window.spid.joueurParties(payload.licence)
            .then((resp:any)=>{
                //console.log(resp.resultat)
                this.context.commit('SET_JOUEUR_PARTIES',resp.resultat)
                this.context.commit('SET_LOADING',false)
                this.context.commit('SET_LOADER',{joueurparties:false})
                
            })
            .catch(error=>{
                this.context.commit('SET_LOADING',false)
                this.context.commit('SET_LOADER',{joueurparties:false})
                this.context.commit('SET_ERROR',error)
                window.getApp.$emit('APP_REQUEST_ERROR',error);
            })
    }



    @Mutation
    SET_SEARCHTERM_RESPONSE(payload:any[]){
        this.searchTermResponse_.splice(0,this.searchTermResponse_.length)
        _.forEach(payload,r=>{
            this.searchTermResponse_.push(r)
        })
    }

    public get searchTermResponse(){
        return this.searchTermResponse_
    }
    @Action({})
    searchTerm(searchTerm:string){
       // console.log("Search term",searchTerm)
       this.context.commit('SET_SEARCHTERM_RESPONSE',[])
        window.spid.searchTerm(searchTerm)
            .then((resp:any)=>{
               // console.log(resp);
                this.context.commit('SET_SEARCHTERM_RESPONSE',resp);
            })
            .catch(error=>{
                this.context.commit('SET_ERROR',error)
                window.getApp.$emit('APP_REQUEST_ERROR',error);
            })
    }

    @Mutation
    SET_MESSAGE(payload:any){
        this.message_=_.merge({},payload)
    }

    public get message(){
        return this.message_
    }
    @Action({commit:'SET_MESSAGE'})
    setMessage(payload:any){    
        return payload
    }

    @Mutation
    SET_APIS(payload:any){
        this.apis_=payload
    }

    public get apis(){
        return this.apis_
    }

    @Action({commit:'SET_APIS'})
    getApisInfo(){
        this.context.commit('SET_LOADING',true)
        
        window.spid.apis()
            .then((resp:any)=>{
                //console.log(resp.resultat)
                this.context.commit('SET_APIS',resp)
                
            })
            .catch(error=>{
                this.context.commit('SET_LOADING',false)
            })
    }

    @Mutation
    SET_ISINDEV(payload:boolean){
        this.isInDev_=payload
    }
    get isInDev():boolean{
        return this.isInDev_
    }
    @Action({commit:'SET_ISINDEV'})
    setIsInDev(payload:boolean){
        
        return payload ||false
    }

    @Mutation
    SET_API_RESULT(payload:any){
        this.api_result_=payload
    }

    get apiResult(){
        return this.api_result_
    }
    @Action({})
    executeApi(payload:any){
        this.context.commit('SET_LOADING',true)
        this.context.commit('SET_API_RESULT',{})
        window.spid.execute(payload.apiname,payload.param).then((resp:any)=>{
            //console.log(resp)
            this.context.commit('SET_API_RESULT',resp)
            
        })
        .catch(error=>{
            //console.log(error)
            this.context.commit('SET_LOADING',false)
        })
    }
    @Action({commit:'SET_API_RESULT'})
    clearApiResult(){
        return {}
    }

    @Mutation
    SET_HISTO_CLA(payload:any){
       // console.log(payload)
        this.histo_cla_=payload.histo

        this.histo_cla__[payload.licence]=payload.histo
    }


    get joueurHistoriqueClassement(){
        return this.histo_cla__
    }

    @Action({})
    getJoueurHistoriqueClassement(payload:any){
        //if(this.joueursTT[payload.licence].hasHistoriqueClassement && !payload.force)return
        this.context.commit('SET_LOADING',true)
        this.context.commit('SET_LOADER',{joueurhistocla:true})
        this.context.commit('SET_HISTO_CLA',{histo:{}, licence:payload.licence})
        window.spid.joueurHistoriqueClassement(payload)
            .then((resp:any)=>{
               
                window.spid.joueurDetail(payload).then((r:any)=>{
                    resp.detail=r
                    //console.log(resp)
                    this.context.commit('SET_HISTO_CLA',{histo:resp,licence:payload.licence})
                    this.context.commit('SET_LOADER',{joueurhistocla:false})
                    this.context.commit('SET_LOADING',false)
                })
                .catch(error=>{
                   // console.log(error)
                    this.context.commit('SET_LOADING',false)                    
                    this.context.commit('SET_LOADER',{joueurhistocla:true})
                })

            })
            .catch(error=>{
                //console.log(error)
                this.context.commit('SET_LOADING',false)
                this.context.commit('SET_LOADER',{joueurhistocla:true})
            })
    }

    @Mutation 
    SET_JOUEUR_PARTIES_MYSQL(payload:any){
        //this.joueur_parties_mysql_.splice(0,this.joueur_parties_mysql_.length)
        _.forEach(payload.parties,partie=>{
            partie.pointres=parseInt(partie.pointres)
            partie.coefchamp=parseFloat( partie.coefchamp)
            partie.advclaof=parseInt(partie.advclaof)
            partie.moisannee=parseInt(partie.date.substring(6,8).concat(partie.date.substring(3,5)))
            partie.mois=parseInt(partie.date.substring(3,5))
            
            //console.log(partie)
        })
        this.joueur_parties_mysql_[ payload.licence]=payload.parties
        //this.joueur_parties_mysql_=payload
        /*this.calculatePartiesDefaitesAnormales(payload.licence)
        this.calculatePartiesDefaiteNormales(payload.licence)
        this.calculatePartiesVictoiresAnormales(payload.licence)
        this.calculatePartiesVictoiresNormales(payload.licence)
        this.calculatePartieMensuelNombreVD(payload.licence)
        this.calculatePartiesNombreVD(payload.licence)
        this.calculatePartiesPointsVD(payload.licence)*/

        //this.joueurs__[payload.licence].parties_mysql=payload.parties
        this.joueur_parties_mysql__[payload.licence]=payload.parties
    }

    get joueurPartiesMysql(){
        return this.joueur_parties_mysql_
    }
    @Action({})
    getJoueurPartiesMysql(payload:any){

        //  if(this.joueursTT[payload.licence].hasPartiesMySql && !payload.force)return

        this.context.commit('SET_JOUEUR_PARTIES_MYSQL',{licence:payload.licence,parties:[]})
        this.context.commit('SET_LOADING',true)
        this.context.commit('SET_LOADER',{joueurpartiesmysql:true})
        
        window.spid.joueurPartiesMysql(payload)
            .then((resp:any)=>{
                resp.licence=payload.licence
                this.context.commit('SET_JOUEUR_PARTIES_MYSQL',{parties:resp.partie,licence:resp.licence})
                this.context.commit('SET_LOADING',false)
                this.context.commit('SET_LOADER',{joueurpartiesmysql:false})

            })
            .catch(error=>{
                //console.log(error)
                this.context.commit('SET_LOADING',false)
                this.context.commit('SET_LOADER',{joueurpartiesmysql:false})
            })
    }

    
}


 export default store;