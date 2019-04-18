
import { Module, VuexModule,Mutation,Action,getModule} from 'vuex-module-decorators'
import store from '..'
import {userService} from '@/services/user'
export interface IAppState {

    user_:User |undefined,
    userinfo_:UserInfo|undefined
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
@Module({ dynamic: true, name:'app',store:store})
export class ApplicationStore extends VuexModule implements IAppState{
    
    user_: User | undefined=undefined
    userinfo_: UserInfo |undefined
    loading_:boolean=false
    error_=null

    @Mutation
    SET_LOADING(value:boolean){
        this.loading_=value
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

    @Action({})
    userLogin(licence:string,prenom?:string){
        this.context.commit('SET_LOADING',true)
        this.context.commit('SET_ERROR',null)
        userService.login(licence,prenom)
        .then((resp:any)=>{
            this.context.commit('SET_LOADING',false)
            this.context.commit('SET_USER',resp.licencie);
            this.context.commit('SET_USERINFO',resp.info);
            console.log(resp);
            console.log("YOU ARE LOGGED");
            window.getApp.$emit('APP_LOGIN_SUCCESS',resp);
            
        })
        .catch(error=>{
            this.context.commit('SET_LOADING',false)
            this.context.commit('SET_ERROR',error)
           // console.error(error)
            window.getApp.$emit('APP_REQUEST_ERROR',error);
            
        })
    }
}

const ApplicationModule = getModule(ApplicationStore);
export default ApplicationModule