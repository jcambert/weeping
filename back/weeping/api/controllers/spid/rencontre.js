module.exports = {


  friendlyName: 'Rencontre',


  description: 'Rencontre spid.',


  inputs: {
    is_retour:{
      type:'number',
      required:false
    },
    phase:{
      type:'number',
      required:false,
    },
    res_1:{
      type:'number',
      required:false
    },
    res_2:{
      type:'number',
      required:false
    },
    renc_id:{
      type:'number',
      required:false
    },
    equip_1:{
      type:'string',
      required:false
    },
    equip_2:{
      type:'string',
      required:false,
    },
    equip_id1:{
      type:'number',
      required:false
    },
    equip_id2:{
      type:'number',
      required:false
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    weep.spid.rencontre(inputs)
    .then(resp=>{
      return exits.success(resp.data);
    })
    .catch(err=>{
      return exits.badRequest(err);
    });

  }


};
