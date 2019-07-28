
var axios = require('axios');
var qs = require('querystring');
var crypto = require('crypto');
var strftime = require('strftime')
var xml2js = require('xml2js');
var parser = new xml2js.Parser({explicitArray : false});


function get_hash(text){
    return crypto.createHmac('sha1', key).update(text).digest('hex');
}
function spidauth(){
    
    
    tm=strftime("%Y%m%d%H%M%S000");
    tmc=get_hash(tm);

    //tm="20180921105708490";
    //sails.log.debug("tm:",tm);
    //sails.log.debug("tmc:",tmc);
    //sails.log.debug(tmc == "33f0ce7d89042e2d049659a103fbf636c9f8234a");
    return {tm:tm,tmc:tmc};
}

function makeurl(api,opts){
   // sails.log.debug(opts);
    var q=qs.stringify(Object.assign({},spidqs,spidauth(),opts));
    var url = sails.config.custom.spid.api.endpoint.format( sails.config.custom.spid.api[api],q);

    sails.log.debug(url);
    return url;
}
const key=crypto.createHash('md5').update(sails.config.spidauth.password).digest("hex");
const spidqs={"id":sails.config.spidauth.appid,"serie":sails.config.spidauth.serie};

const req = axios.create({
    baseURL: sails.config.custom.spid.endpoint,
    timeout: 1000,
    transformRequest: [function (data, headers) {
       
        return data;
      }],
    transformResponse: [function (data) {
        // Do whatever you want to transform the data
        //sails.log.info('Axios Transform Response');
        var res;
        try{
            parser.parseString(data, function (err, result) {
                //console.dir(JSON.stringify(result));
                res=result;
            });
        }catch (error) {
            throw Error(`[requestClient] Error parsing response JSON data - ${JSON.stringify(error)}`)
          }
        return res;
      }],
    
});

const request = function(api,opts){
    /*return new Promise( (resolve,reject)=>{
        resolve(makeurl(api));
    })*/
    url= makeurl(api,opts)
   // sails.debug.log(url)
    return req.get(url);
}

module.exports= {
    request:request,
    baseurl:sails.config.custom.spid.endpoint,
    url:makeurl,
    auth:spidauth,
    club_liste:opts=>{return request("club_liste",opts)},
    club_detail:opts=>{return request("club_detail",opts)},
    organisme:opts=>{return request("organisme",opts)},
    epreuve:opts=>{return request("epreuve",opts)},
    division:opts=>{return request("division",opts)},
    resultat_equipe:opts=>{return request("resultat_equipe",opts)},
    rencontre:opts=>{return request("rencontre",opts)},
    equipe_liste:opts=>{return request("equipe_liste",opts)},
    resultat_indiv:opts=>{return request("resultat_indiv",opts)},
    classement:opts=>{return request("classement",opts)},
    joueur_liste_cla:opts=>{return request("joueur_liste_cla",opts)},
    joueur_liste_spid:opts=>{return request("joueur_liste_spid",opts)},
    joueur_detail_cla:opts=>{return request("joueur_detail_cla",opts)},
    joueur_detail_spid:opts=>{return request("joueur_detail_spid",opts)},
    joueur_partie_mysql:opts=>{return request("joueur_partie_mysql",opts)},
    joueur_partie_spid:opts=>{return request("joueur_partie_spid",opts)},
    joueur_historique_cla:opts=>{return request("joueur_historique_cla",opts)},
}