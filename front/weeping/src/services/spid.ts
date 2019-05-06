
import Vue from 'vue'
import app, { IApi, IApiContent, Verb } from '@/api/app'

import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'
import _ from 'lodash'
const qs = require('querystring');
export interface IJoueursListe{
    club?:string
    licence?:string
    nom?:string
    prenom?:string

}
export interface ISpidService{
    calculPoints(joueurs:any,partie:any):{}
    login(licence:string,prenom?:string|""):Promise<{}>
    clubInfo(numero:string):Promise<{}>
    joueurInfo(licence:string):Promise<{}>
    equipes(numero:string,phase:string):Promise<{}>
    classementEquipe(lien:string):Promise<{}>
    resultatEquipe(lien: string): Promise<{}>
    detailRencontre(lien:string):Promise<{}>
    joueurParties(licence:string):Promise<{}>
    searchTerm(searchTerm:string):Promise<{}>
    joueurs(payload:IJoueursListe):Promise<{}>
    clubs(payload:any):Promise<{}>
}
/*interface IRequestOption{
    baseURL:string
    url:string
    method:string
    data?:object,
    timeout?:Number
}*/
class SpidService implements ISpidService{

   // baseUrl:string
   self:SpidService
    constructor(){
       
        //console.log("creating new instance of LoginService")
        this.self=this;
    }

    get baseUrl(){
        return app.service.url
    }   

    buildReq(meth:string,data:object):AxiosRequestConfig{
        var api=app.service.api[meth] as IApiContent
        var opts:AxiosRequestConfig={
            baseURL: app.service.url,
            url:api.url,
            method:api.verb,
            timeout:app.service.timeout
        }
        // eslint-disable-next-line
        //console.log(opts)
        if(api.verb==Verb.GET && opts.url){
            if(api.useQuery)
                opts.url=opts.url.concat(qs.stringify(data) )
            else
                opts.url=opts.url.formatUnicorn(data)
        }
        if(api.verb==Verb.POST)
            opts.data=data
        //console.log(opts)
        return opts
    }
    public login(licence:string,prenom:string|""){
        //console.log(this);
        var data:{}
        if(_.isFinite(parseInt(licence)))
            data={licence:licence}
        else
            data={
                nom:licence.toUpperCase(),
                prenom:prenom.capitalize()
            }
        let req= axios(this.buildReq('login',data) )
        //console.log(reqlogin)

        return new Promise((resolve,reject)=>{
            req
            .then(resp=>{
               // console.log(resp);
                if(resp.data.liste.joueur)
                    resolve(resp.data.liste.joueur);
                else    
                    reject(Object.assign({},resp, {message:"Veuillez saisir des informations d'identification correctes"}));
            })
           
            .catch(error=>{
                reject(error)
            })
        }).then(this.retrieveInfo)

    }

    retrieveInfo(joueur:any){
        var opts={
            baseURL: app.service.url,
            url:app.service.api.retrieveLicencieInfo.url.formatUnicorn(joueur),
            method:app.service.api.retrieveLicencieInfo.verb,
            //data:{licence:joueur.licence}
        }
        let reqretrieve= axios(opts)
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
        var opts={
            baseURL: app.service.url,
            url:app.service.api.clubinfo.url.formatUnicorn({club:numero}),
            method:app.service.api.clubinfo.verb
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
            baseURL: app.service.url,
            url:app.service.api.joueurinfo.url.formatUnicorn({licence:licence}),
            method:app.service.api.clubinfo.verb
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
            baseURL: app.service.url,
            url:app.service.api.equipes.url.formatUnicorn({club:numero,type:'A'}),
            method:app.service.api.equipes.verb
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
            baseURL: app.service.url,
            url:app.service.api.classementequipe.url.formatUnicorn(query),
            method:app.service.api.equipes.verb
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
            baseURL: app.service.url,
            url:app.service.api.resultatequipe.url.formatUnicorn(query),
            method:app.service.api.equipes.verb
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
       /* let opts={
            baseURL: app.service.url.formatUnicorn({host:location.hostname,port:config.back_port}),
            url:app.service.api.detailrencontre.url.formatUnicorn(query),
            method:app.service.api.equipes.verb
        }*/
        var opts=this.buildReq('detailrencontre',query)
        
        let req= axios(opts)
        return new Promise((resolve,reject)=>{
            req
            .then((resp:any)=>{
                resolve(resp.data.liste)
            })
            .catch(error=>{
                reject(error)
            })
        })
    }

    public async joueurParties(licence: string): Promise<{}> {
        let opts={
            baseURL: app.service.url,
            url:app.service.api.joueurparties.url.formatUnicorn({licence:licence}),
            method:app.service.api.clubinfo.verb
        }
       
        let req= axios(opts)
        return new Promise((resolve,reject)=>{
            req
            .then((resp:any)=>{
               // console.log(resp)
                resolve(resp.data.liste)
            })
            .catch(error=>{
                reject(error)
            })
        })
    }

    public calculPoints(joueurs:any,partie:any):{}{
        return calculPoints(joueurs,partie)
    }

    public async joueurs(payload:IJoueursListe):Promise<{}>{
        /*let opts={
            baseURL: app.service.url.formatUnicorn({host:location.hostname,port:config.back_port}),
            url:app.service.api.joueurs.url,
            method:app.service.api.clubinfo.verb
        }
        console.log(opts)*/
        var opts=this.buildReq('joueurs',payload)
        var req= axios(opts)
        return new Promise((resolve,reject)=>{
            req
            .then((resp:any)=>{
                //console.log(resp)
                resolve(resp.data.liste.joueur)
            })
            .catch(error=>{
                reject(error)
            })
        })
    }

    public async clubs(payload:any):Promise<{}>{
        var opts=this.buildReq('clubs',payload)
        var req= axios(opts)
        return new Promise((resolve,reject)=>{
            req
            .then((resp:any)=>{
               // console.log(resp)
                resolve(resp.data.liste)
            })
            .catch(error=>{
                reject(error)
            })
        })
    }
    public async searchTerm(searchTerm:string):Promise<{}>{
        var terms = searchTerm.split(' ')
        var result:any[]=[];
        var promises:any[]=[];
        for (let index = 0; index < terms.length; index++) {
            const term = terms[index];
            //console.log(parseInt(term))
            if(_.isFinite(parseInt(term))){
               // console.log('1')
                promises.push( this.joueurs({licence:term}))
                promises.push(this.clubInfo(term))
            }else{
               // console.log('2')
                promises.push(this.clubs({ville:term}))
                if(!_.isUndefined(terms[index+1])){
                  //  console.log('3')
                    promises.push(this.joueurs({nom:term,prenom:terms[index+1]}))
                    index+=1
                }else{
                   // console.log('4')
                    promises.push(this.joueurs({nom:term}))
                }
            }
        }
       

        return Promise.all(promises).then( (_results:any[])=>{
            return _results
        }).then((res)=>{
            return new Promise((resolve,reject)=>{
                resolve(res);
            })
        })
        
    }
}

export const spidService = new SpidService()


var bareme={
    24:{vn:5,dn:-5,va:6,da:-5},
    49:{vn:5.5,dn:-4.5,va:7,da:-6},
    99:{vn:5,dn:-4,va:8,da:-7},
    149:{vn:4,dn:-3,va:10,da:-8},
    199:{vn:3,dn:-2,va:13,da:-10},
    299:{vn:2,dn:-1,va:17,da:-12.5},
    399:{vn:1,dn:-0.5,va:22,da:-16},
    499:{vn:0.5,dn:0,va:28,da:-20},
    99999:{vn:0,dn:0,va:40,da:-29},
    }
export   function calculPoints(joueurs:any,partie:any){
    var ecart=parseInt(joueurs.ja.points)-parseInt(joueurs.jb.points)
    var score=parseInt( partie.scorea)>parseInt(partie.scoreb)
    var b=_.findLast(bareme,(b,key)=>{ return parseInt(key) <=Math.abs(ecart)})
    if(_.isUndefined(b))
        b=bareme[24]
    //console.log('joueurs',joueurs,'partie',partie,'ecart',ecart,'score',score, 'bareme',b)
    if(score)
        return {pointa:ecart>0?b.vn:b.va,pointb:ecart>0?b.dn:b.da}
    else
        return {pointa:ecart>0?b.da:b.dn,pointb:ecart>0?b.va:b.vn}
}
