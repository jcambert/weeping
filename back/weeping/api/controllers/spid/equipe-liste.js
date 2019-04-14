module.exports = {


  friendlyName: 'Equipe liste',


  description: 'renvoie une liste des equipes d\'un club',


  inputs: {
    numclu:{
      description:"Numero du club",
      type:'string',
      required:true
    },
    type:{
      description:"M= pour les equipes du championnat de france masculin,F= pour les equipes du championnat de france feminin, A= pour toutes les equipes du championnat de france, rien= pour toutes les autres equipes",
      type:'string',
      required:false
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    weep.spid.equipe_liste(inputs)
    .then(resp=>{
      return exits.success(resp.data);
    })
    .catch(err=>{
      return exits.badRequest(err);
    });

  }


};
