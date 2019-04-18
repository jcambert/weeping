
import Vue from 'vue'
import config from '@/api/app'
import axios, { AxiosPromise } from 'axios'
import _ from 'lodash'
class UserService{
   
    constructor(){
       
        console.log("creating new instance of LoginService")

    }
    public login(licence:string,prenom?:string|""){
        var data:{}
        if(_.isFinite(parseInt(licence)))
            data={licence:licence}
        else
            data={
                licence:licence,
                prenom:prenom
            }
        let reqlogin= axios({
            baseURL: config.service.url,
            url:config.service.api.login.url,
            method:config.service.api.login.verb,
            data:data
        })
        //console.log(reqlogin)

        return new Promise((resolve,reject)=>{
            reqlogin
            .then(resp=>{
               // console.log(resp);
                if(resp.data.liste.joueur)
                    resolve(resp.data.liste.joueur);
                else    
                    reject("Veuillez saisir toutes les informations d'identification");
            })
           
            .catch(error=>{
                reject(error)
            })
        }).then(this.retrieveInfo)

    }

    retrieveInfo(joueur:any){

        let reqretrieve= axios({
            baseURL: config.service.url,
            url:config.service.api.retrieveLicencieInfo.url.formatUnicorn(joueur),
            method:config.service.api.retrieveLicencieInfo.verb,
            data:{licence:joueur.licence}
        })
        return new Promise((resolve,reject)=>{
            reqretrieve
            .then(resp=>{
                resolve({licencie:joueur,info:resp.data});
            })
            .catch(error=>{
                resolve({licencie:joueur});
            })
        })
    }
}

export const userService = new UserService()