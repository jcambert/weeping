module.exports = {


  friendlyName: 'Classement',


  description: 'Renvoie le classement general d\'une division du criterium',


  inputs: {
    res_division:{
      description:"Id de la division",
      type:'number',
      required:true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    weep.spid.classement(inputs)
    .then(resp=>{
      return exits.success(resp.data);
    })
    .catch(err=>{
      return exits.badRequest(err);
    });

  }


};
