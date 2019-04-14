module.exports = {


  friendlyName: 'Organisme',


  description: 'Renvoie une liste des organismes',


  inputs: {
    type:{
      description:"type d'organisme (F=Fédération,Z=Zone,L=Ligue,D=Département)",
      type:'string',
      required:true
    }
  },


  exits: {
    invalid: {
      responseType: 'badRequest',
      description: 'Le code de l\'organisme doit etre soit F,Z,L,D' ,
      
    },
  },


  fn: async function (inputs, exits) {

    if(!['F','Z','L','D'].includes(inputs.type))
      return exits.invalid({error:'Le code de l\'organisme doit etre soit F,Z,L,D'});
    weep.spid.organisme(inputs)
    .then(resp=>{
      return exits.success(resp.data);
    })
    .catch(err=>{
      return exits.badRequest(err);
    });

  }


};
