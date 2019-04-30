export interface IApplicationServiceConfiguration{
    url:string
    api:IApi
}

export interface IApplicationDevelopperConfiguration{
    name:string
    avatar:string
    github:string
    mail:string
}
export interface IApplicationConfiguration{
    name:string
    alt:string
    logo:string
    dev:IApplicationDevelopperConfiguration
    service:IApplicationServiceConfiguration

}
export enum Verb{
    GET='get',
    POST='post'
}

export interface IApi{
    [key: string]: IApiContent;
}

export interface IApiContent{
    verb:Verb
    url:string
}
const app:IApplicationConfiguration={
    name:"WeePing",
    alt:"WeePing Application for Table Tennis players",
    logo:"/static/m.png",
    dev:{
        name:"Jean-Christophe Ambert",
        avatar:"/static/avatar/me.jpg",
        github:"https://github.com/jcambert/weeping",
        mail:"jc.ambert@gmail.com",
    },
    service:{
        url:'http://{host}:1337/api/v1/',
        api:{
            login:{
                verb:Verb.POST,
                url:'spid/login'
            },
            retrieveLicencieInfo:{
                verb:Verb.GET,
                url:'user-info/{licence}'
            },
            clubinfo:{
                verb:Verb.GET,
                url:'club-info/{club}'
            },
            joueurinfo:{
                verb:Verb.GET,
                url:'joueur-info/{licence}'
            },
            equipes:{
                verb:Verb.GET,
                url:'equipes/{type}/{club}'
            },
            classementequipe:{
                verb:Verb.GET,
                url:'resultat-equipe/{cx_poule}/{d1}/classement'
            },
            resultatequipe:{
                verb:Verb.GET,
                url:'resultat-equipe/{cx_poule}/{d1}/'
            },
            detailrencontre:{
                verb:Verb.GET,
                url:'detail-rencontre/{is_retour}/{phase}/{res_1}/{res_2}/{renc_id}/{equip_1}/{equip_2}/{equip_id1}/{equip_id2}'
            },
            joueurparties:{
                verb:Verb.GET,
                url:'joueur-parties/{licence}'
            }
        }
    }

}

export default app