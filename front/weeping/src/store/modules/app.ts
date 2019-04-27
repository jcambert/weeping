
import { Module, VuexModule,Mutation,Action,getModule} from 'vuex-module-decorators'
import store from '..'

export interface IAppState {

    user_:User |undefined,
    userinfo_:UserInfo|undefined,
    clubinfo_:ClubInfo|undefined
  }

export interface User{
    club:string,
    echelon:string,
    licence:string,
    nclub:string,
    nom:string,
    place:string,
    point:string,
    prenom:string,
    sexe:string,
    
    
}
export interface UserInfo{
    licence:string,
    email:string|undefined,
    avatar:string|undefined,
    phone:string|undefined
}

export interface ClubInfo{
    idclub:string,
    numero:string|undefined,
    nom: string|undefined,
    nomsalle:string|undefined,
    adressesalle1: string|undefined,
    adressesalle2:string|undefined,
    adressesalle3: string|undefined,
    codepsalle:string|undefined,
    villesalle:string|undefined,
    web:string|undefined,
    nomcor:string|undefined,
    prenomcor:string|undefined,
    mailcor:string|undefined,
    telcor:string|undefined,
    latitude:string|undefined,
    longitude:string|undefined,
    datevalidation:string|undefined
}

export interface JoueurInfo{
    licence: string,
    nom: string,
    prenom: string,
    club: string,
    nclub: string,
    natio: string,
    clglob: string,
    point: string,
    aclglob: string,
    apoint: string,
    clast: string,
    clnat: string,
    categ: string,
    rangreg: string,
    rangdep: string,
    valcla: string,
    clpro: string,
    valinit: string
}
/*
@Module({ dynamic: true, store,name:'app'})
export default class ApplicationStore extends VuexModule implements IAppState{
     
    user_: User | undefined=undefined
    userinfo_: UserInfo |undefined
    clubinfo_:ClubInfo | undefined
    loading_:boolean=false
    error_=null

    constructor(module: any){
        super(module)
        console.log('ApplicationStore created')
    }

    @Mutation
    SET_LOADING(value:boolean){
        this.loading_=value;
    }

    @Action({commit:'SET_LOADING'})
    setLoading(value:boolean){
        return value;
    }

    get loading(){
        return this.loading_
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

    get error(){
        return this.error_
    }

    @Mutation
    SET_USER(value:User){
        console.log('set new user',value)
        this.user_=value
    }

    @Action({commit:'SET_USER'})
    setUser(user:User){
        return user
    }

    
    get user():User |undefined{
        return this.user_
    }
   
    @Mutation
    SET_USERINFO(value:UserInfo){
        this.userinfo_=value
    }

    @Action({commit:'SET_USERINFO'})
    setUserInfo(userinfo:UserInfo){
        return userinfo
    }
    
    get userInfo():UserInfo |undefined{
        return this.userinfo_;
    }

    @Mutation
    NONE(value:any){

    }

    @Action({})
    public userLogin(licence:string,prenom?:string){
        this.context.commit('SET_LOADING',true)
        this.context.commit('SET_ERROR',null)
        window.spid.login(licence,prenom)
        .then((resp:any)=>{
            this.context.commit('SET_LOADING',false)
            this.context.commit('SET_USER',resp.licencie);
            this.context.commit('SET_USERINFO',resp.info);
            //console.log(resp);
            //console.log("YOU ARE LOGGED");
            window.getApp.$emit('APP_LOGIN_SUCCESS',resp);
            
        })
        .catch(error=>{
            this.context.commit('SET_LOADING',false)
            this.context.commit('SET_ERROR',error)
            window.getApp.$emit('APP_REQUEST_ERROR',error);
            
        })
        return "";
    }


    @Mutation
    SET_CLUB_INFO(club:ClubInfo){
        this.clubinfo_=club
    }
    get clubInfo():ClubInfo|undefined{
        return this.clubinfo_
    }
    @Action({commit:'NONE'})
    public getClubInfo(numero:string){
        this.context.commit('SET_LOADING',true)
        this.context.commit('SET_ERROR',null)
        window.spid.clubInfo(numero)
            .then( (resp:any)=>{
                this.context.commit('SET_LOADING',false)
                this.context.commit('SET_CLUB_INFO',resp.club);
            })
            .catch(error=>{
                this.context.commit('SET_LOADING',false)
                this.context.commit('SET_ERROR',error)
                window.getApp.$emit('APP_REQUEST_ERROR',error);
            })
        return "";
    }
}*/

//const ApplicationModule = getModule(ApplicationStore);
//export default ApplicationModule