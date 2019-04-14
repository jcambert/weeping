module.exports = {


  friendlyName: 'Club detail',


  description: 'Renvoie le détail pour un club',


  inputs: {
    club:{
      description:"Numéro du club",
      type:'string',
      required:true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    weep.spid.club_detail(inputs)
    .then(resp=>{
      return exits.success(resp.data);
    })
    .catch(err=>{
      return exits.badRequest(err);
    });
    

  }


};
