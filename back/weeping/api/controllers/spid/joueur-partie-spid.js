module.exports = {


  friendlyName: 'Joueur partie',


  description: 'Renvoie une liste des parties d\'un joueur de la base SPID',


  inputs: {
    numlic:{
      description:"Numero de licence",
      type:'string',
      required:true
    }
  },


  exits: {
    badRequest: {
        description: 'Invalid data',
        //This one, as well as ´ok´ are always available
        responseType: 'badRequest'
    },
  },


  fn: async function (inputs, exits) {

    weep.spid.joueur_partie_spid(inputs)
    .then(resp=>{
      return exits.success(resp.data);
    })
    .catch(err=>{
      return exits.badRequest(err);
    });
  }


};
