module.exports = {


  friendlyName: 'Epreuve',


  description: 'Revoie une liste de epreuves pour un organisme',


  inputs: {
    organisme:{
      description:"Id unique de l'organisme",
      type:'string',
      required:false
    },
    type:{
      description:"Type de l'epreuve (E=Equipes, I=Individuelles",
      type:'string',
      required:false
    }
  },


  exits: {
    invalid: {
      responseType: 'badRequest',
      description: 'Le code de l\'epreuve doit etre soit E ou I' ,
      
    },
  },


  fn: async function (inputs, exits) {

    if(inputs.type && !['E','I'].includes(inputs.type))
      return exits.invalid({error:'Le code de l\'epreuve doit etre soit E ou I'});
    weep.spid.epreuve(inputs)
    .then(resp=>{
      return exits.success(resp.data);
    })
    .catch(err=>{
      return exits.badRequest(err);
    });

  }


};
