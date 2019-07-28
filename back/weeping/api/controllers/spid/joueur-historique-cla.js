module.exports = {


  friendlyName: 'Joueur historique classement',


  description: 'Renvoie l\'historique classement d\'un joueur',


  inputs: {
    licence:{
      description:"Numero de licence",
      type:'string',
      required:true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    weep.spid.joueur_historique_cla({numlic:inputs.licence})
    .then(resp=>{
      return exits.success(resp.data);
    })
    .catch(err=>{
      return exits.badRequest(err);
    });

  }


};
