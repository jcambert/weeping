module.exports = {


  friendlyName: 'Resultat equipe',


  description: 'Renvoie les resultats ou classement d\'une poule de championnat par equipes',


  inputs: {
    action:{
      description:"poule = Recuperer les différentes poules, classement = recuperer le classement, rien = recuperer les rencontres",
      type:'string',
      required:false
    },
    d:{
      description:"Id de la division",
      type:'string',
      required:false,
    },
    cx_poule:{
      description:"Id de la poule demandée",
      type:'number',
      required:false
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var opts=Object.assign({auto:1},inputs);
    if(opts.d){
      opts['D1']=opts.d;
      delete opts.d
    }
    if(!opts.action) opts.action="";
    weep.spid.resultat_equipe(opts)
    .then(resp=>{
      return exits.success(resp.data);
    })
    .catch(err=>{
      return exits.badRequest(err);
    });

  }


};
