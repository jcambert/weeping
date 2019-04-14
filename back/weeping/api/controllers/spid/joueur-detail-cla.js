module.exports = {


  friendlyName: 'Joueur detail cla',


  description: 'renvoie un joueur provenant de la base classement',


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

    weep.spid.joueur_detail_cla(inputs)
    .then(resp=>{
      return exits.success(resp.data);
    })
    .catch(err=>{
      return exits.badRequest(err);
    });
  }


};
