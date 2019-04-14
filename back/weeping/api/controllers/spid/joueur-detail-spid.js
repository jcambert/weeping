module.exports = {


  friendlyName: 'Joueur detail spid',


  description: 'Renvoie un joueur provenant de la base des licencies SPID',


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

    weep.spid.joueur_detail_spid(inputs)
    .then(resp=>{
      return exits.success(resp.data);
    })
    .catch(err=>{
      return exits.badRequest(err);
    });

  }


};
