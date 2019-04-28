module.exports = {


  friendlyName: 'Joueur partie',


  description: 'Renvoie une liste des parties d\'un joueur de la base de classement mysql',


  inputs: {
    numlic:{
      description:"Numero de licence",
      type:'string',
      required:true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    weep.spid.joueur_partie(inputs)
    .then(resp=>{
      return exits.success(resp.data);
    })
    .catch(err=>{
      return exits.badRequest(err);
    });
  }


};
