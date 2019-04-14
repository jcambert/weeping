module.exports = {


  friendlyName: 'Resultat indiv',


  description: 'Renvoies les resultats d\'une épreuve individuelle',


  inputs: {
    action:{
      description:"poule= liste des different groupe, classement= classement de groupe, partie=les parties disputées",
      type:'string',
      required:true
    },
    epr:{
      description:"Id de l'epreuve",
      type:'number',
      required:true
    },
    res_division:{
      description:"Id de la division",
      type:'number',
      required:true
    },
    cx_tableau:{
      description:"Id du groupe (optionel)",
      type:'number',
      required:false
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    weep.spid.resultat_indiv(inputs)
    .then(resp=>{
      return exits.success(resp.data);
    })
    .catch(err=>{
      return exits.badRequest(err);
    });

  }


};
