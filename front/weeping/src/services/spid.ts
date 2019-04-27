
import Vue from 'vue'
import config from '@/api/app'
import axios, { AxiosPromise } from 'axios'
import _ from 'lodash'
const qs = require('querystring');

export interface ISpidService{
    login(licence:string,prenom?:string|""):Promise<{}>;
    clubInfo(numero:string):Promise<{}>;
    joueurInfo(licence:string):Promise<{}>;
    equipes(numero:string,phase:string):Promise<{}>;
    classementEquipe(lien:string):Promise<{}>;
    resultatEquipe(lien: string): Promise<{}>;
    detailRencontre(lien:string):Promise<{}>
}

class SpidService implements ISpidService{
    
    
    
   
    hostname:string
   // baseUrl:string
   self:SpidService
    constructor(){
       
        //console.log("creating new instance of LoginService")
        this.self=this;
        this.hostname=location.hostname

    }

    get baseUrl(){
        return config.service.url.formatUnicorn({host:this.hostname})
    }   

    buildReq(meth:string,data:object){
        let opts={
            baseURL: config.service.url.formatUnicorn({host:this.hostname}),
            url:config.service.api[meth].url,
            method:config.service.api[meth].verb,
        }
        if(opts.method=='get'){
            opts.url=opts.url.formatUnicorn(data)
        }
        if(opts.method=='post')
            opts.data=data
        //console.log(opts)
        return opts
    }
    public login(licence:string,prenom?:string|""){
        //console.log(this);
        var data:{}
        if(_.isFinite(parseInt(licence)))
            data={licence:licence}
        else
            data={
                licence:licence,
                prenom:prenom
            }
        let req= axios(this.buildReq('login',data) /*{
            baseURL: config.service.url,
            url:config.service.api.login.url,
            method:config.service.api.login.verb,
            data:data
        }*/)
        //console.log(reqlogin)

        return new Promise((resolve,reject)=>{
            req
            .then(resp=>{
               // console.log(resp);
                if(resp.data.liste.joueur)
                    resolve(resp.data.liste.joueur);
                else    
                    reject(Object.assign({},resp, {message:"Veuillez saisir les informations d'identification"}));
            })
           
            .catch(error=>{
                reject(error)
            })
        }).then(this.retrieveInfo)

    }

    retrieveInfo(joueur:any){

        let reqretrieve= axios({
            baseURL: config.service.url.formatUnicorn({host:location.hostname}),
            url:config.service.api.retrieveLicencieInfo.url.formatUnicorn(joueur),
            method:config.service.api.retrieveLicencieInfo.verb,
            //data:{licence:joueur.licence}
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

    public async clubInfo(numero:string){
        let opts={
            baseURL: config.service.url.formatUnicorn({host:location.hostname}),
            url:config.service.api.clubinfo.url.formatUnicorn({club:numero}),
            method:config.service.api.clubinfo.verb
        }
       
        let req= axios(opts)
        return new Promise((resolve,reject)=>{
            req
            .then((resp:any)=>{
                //console.log(resp.data.liste)
                resolve(resp.data.liste)
            })
            .catch(error=>{
                reject(error)
            })
        })
    }

    public async joueurInfo(licence: string): Promise<{}> {
        let opts={
            baseURL: config.service.url.formatUnicorn({host:location.hostname}),
            url:config.service.api.joueurinfo.url.formatUnicorn({licence:licence}),
            method:config.service.api.clubinfo.verb
        }
       
        let req= axios(opts)
        return new Promise((resolve,reject)=>{
            req
            .then((resp:any)=>{
                //console.log(resp.data.liste)
                resolve(resp.data.liste)
            })
            .catch(error=>{
                reject(error)
            })
        })
    }

    public async equipes(numero: string,phase:string): Promise<{}> {
        let opts={
            baseURL: config.service.url.formatUnicorn({host:location.hostname}),
            url:config.service.api.equipes.url.formatUnicorn({club:numero,type:'A'}),
            method:config.service.api.equipes.verb
        }
       
        let req= axios(opts)
        return new Promise((resolve,reject)=>{
            req
            .then((resp:any)=>{
              //  console.log(resp.data.liste)
                resolve(_.filter(resp.data.liste.equipe,e=>{return e.libequipe.indexOf("Phase ".concat(phase)) >0}))
            })
            .catch(error=>{
                reject(error)
            })
        })
    }

    public async classementEquipe(lien: string): Promise<{}> {
        let query=qs.parse(lien)
        //console.log(query)
        let opts={
            baseURL: config.service.url.formatUnicorn({host:location.hostname}),
            url:config.service.api.classementequipe.url.formatUnicorn(query),
            method:config.service.api.equipes.verb
        }
        //console.log(opts)
        let req= axios(opts)
        return new Promise((resolve,reject)=>{
            req
            .then((resp:any)=>{
                //console.log(resp.data.liste)
                resolve(resp.data.liste.classement)
            })
            .catch(error=>{
                reject(error)
            })
        })
    }

    public async resultatEquipe(lien: string): Promise<{}> {
        let query=qs.parse(lien)
        //console.log(query)
        let opts={
            baseURL: config.service.url.formatUnicorn({host:location.hostname}),
            url:config.service.api.resultatequipe.url.formatUnicorn(query),
            method:config.service.api.equipes.verb
        }
        //console.log(opts)
        let req= axios(opts)
        return new Promise((resolve,reject)=>{
            req
            .then((resp:any)=>{
                //console.log(resp.data.liste)
                resolve(resp.data.liste.tour)
            })
            .catch(error=>{
                reject(error)
            })
        })
    }

    public async detailRencontre(lien: string): Promise<{}> {
        let query=qs.parse(lien)
        //console.log(query)
        let opts={
            baseURL: config.service.url.formatUnicorn({host:location.hostname}),
            url:config.service.api.detailrencontre.url.formatUnicorn(query),
            method:config.service.api.equipes.verb
        }
        console.log(opts)
        let req= axios(opts)
        return new Promise((resolve,reject)=>{
            req
            .then((resp:any)=>{
                console.log(resp.data.liste)
                resolve(resp.data.liste)
            })
            .catch(error=>{
                reject(error)
            })
        })
    }
}

export const spidService = new SpidService()
