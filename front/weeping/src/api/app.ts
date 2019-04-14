export default{
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
        url:'http://localhost:1337/api/v1/',
        api:{
            login:{
                verb:'post',
                url:'spid/login'
            },
            retrieveLicencieInfo:{
                verb:'get',
                url:'userinfo/{licence}'
            }
        }
    }

}