import { Level } from '@/plugins/logger';


String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
function (this:string,...arg:any):string {
    "use strict";
    var str:string = this;//(this as String).toString();
    if (arg.length) {
        var t = typeof arg[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arg)
            : arg[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};

String.prototype.capitalize = String.prototype.capitalize ||
function(this:string){
    return this.charAt(0).toUpperCase() + this.slice(1)
}

export interface IApplicationLoggerConfiguration{
    level: Level
    debug:boolean
}

export interface IApplicationSocketConfiguration{
    url:string
}

export interface IApplicationServiceConfiguration{
    url:string
    api:IApi
    timeout:number
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
    socket:IApplicationSocketConfiguration
    service:IApplicationServiceConfiguration
    theme:IAppTheme,
    logger:IApplicationLoggerConfiguration

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
export const url='http://{host}:{port}'
export const isInDev = process.env.mode != 'production'
export const isInProd = process.env.mode == 'production'
console.log('isindev',isInDev)
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
    socket:{
        url:url.formatUnicorn({port: process.env.SOCKET_PORT || '1337',host:process.env.SOCKET_LOCATION || location.hostname})
    },
    service:{
        //url:'http://{host}:{port}/api/v1/',
        url:url.formatUnicorn( {port:process.env.SERVICE_PORT || '1337',host:process.env.SERVICE_LOCATION || location.hostname}).concat("/api/v1/"),
        timeout: process.env.REQUEST_TIMEOUT || 3000,
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
                url:'detail-rencontre?',
                useQuery:true
            },
            joueurparties:{
                verb:Verb.GET,
                url:'joueur-parties/{licence}'
            },
            joueurpartiesmysql:{
                verb:Verb.GET,
                url:'/spid/joueur-partie-mysql?',
                useQuery:true
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
            },
            joueurhistocla:{
                verb:Verb.GET,
                url:'/spid/joueur-historique-cla?',
                useQuery:true
            },
            joueurDetail:{
                verb:Verb.GET,
                url:'/spid/joueur-detail-spid?',
                useQuery:true
            },
            info:{
                verb:Verb.GET,
                url:'/spid/info'
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
    },
    logger:{
        level:process.env.mode == "development"? Level.DEBUG:Level.ERROR,
        debug:process.env.mode == "development"
        
    }
      
    
      

}

export default app