
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
