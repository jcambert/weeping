
import { Module, VuexModule,Mutation,Action,getModule} from 'vuex-module-decorators'
import store from '..'

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
    
    user_: User | undefined;
    userinfo_: UserInfo |undefined
    @Mutation
    SET_USER(value:User){
        this.user_=value
    }

    @Action({commit:'SET_USER'})
    setUser(user:User){
        return user
    }

    
    get user():User|undefined{
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
}

const ApplicationModule = getModule(ApplicationStore);
export default ApplicationModule