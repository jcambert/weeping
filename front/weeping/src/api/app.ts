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
    service:IApplicationServiceConfiguration,
    theme:IAppTheme

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
    useQuery?:boolean
}
export interface IAppTheme{
    [key: string]: IAppThemeContent;
}
export interface IAppThemeContent{
    sideNav: string,
    mainNav: string,
    sideMenu: string
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
        url:'http://{host}:{port}/api/v1/',
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
            },
            joueurs:{
                verb:Verb.GET,
                url:'spid/joueur-liste-spid?',
                useQuery:true
            },
            clubs:{
                verb:Verb.GET,
                url:'spid/club-liste?',
                useQuery:true
            }
        }
    },
    theme: {
        blue:{
            sideNav: 'blue',
            mainNav: 'blue',
            sideMenu: 'white'
        },
        lightBlue:{
            sideNav: 'blue',
             mainNav: 'white',
             sideMenu: 'blue lighten-1'
        },
        teal:{
            sideNav: 'teal',
            mainNav: 'teal',
            sideMenu: 'white'
        },
        red:{
            sideNav: 'red',
            mainNav: 'red',
            sideMenu: 'green'
        },
        orange:{
            sideNav: 'orange',
            mainNav: 'orange',
            sideMenu: 'white'
        },
        purple:{
            sideNav: 'purple',
            mainNav: 'purple',
            sideMenu: 'white'
        },
        indigo:{
            sideNav: 'indigo',
            mainNav: 'indigo',
            sideMenu: 'white'
        },
        cyan:{
            sideNav: 'cyan',
            mainNav: 'cyan',
            sideMenu: 'white'
        },
        pink:{
            sideNav: 'pink',
            mainNav: 'pink',
            sideMenu: 'white'
        },
        green:{
            sideNav: 'green',
            mainNav: 'green',
            sideMenu: 'white'
        }
    }
      
    
      

}

export default app