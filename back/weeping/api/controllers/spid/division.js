module.exports = {


  friendlyName: 'Division',


  description: 'Renvoie une liste des divisions pour une epreuve donnée',


  inputs: {
    organisme:{
      description:"Id unique de l'organisme",
      type:'string',
      required:false
    },
    epreuve:{
      description:"Id de l'epreuve",
      type:'string',
      required:false,
    },
    type:{
      description:"Type de l'epreuve (E=Equipes, I=Individuelles",
      type:'string',
      required:false
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    weep.spid.division(inputs)
    .then(resp=>{
      return exits.success(resp.data);
    })
    .catch(err=>{
      return exits.badRequest(err);
    });

  }


};
