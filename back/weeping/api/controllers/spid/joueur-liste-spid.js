module.exports = {


  friendlyName: 'Joueur liste spid',


  description: '',


  inputs: {
    club:{
      description:"Numero du club (optionnel)",
      type:'string',
      required:false
    },
    licence:{
      description:"Numero de licence (optionnel)",
      type:'string',
      required:false
    },
    nom:{
      description:"Nom du joueur (optionnel)",
      type:'string',
      required:false
    },
    prenom:{
      description:"Prenom du  joueur (optionnel)",
      type:'string',
      required:false
    },
    valid:{
      description:"0= valid (optionnel)",
      type:'number',
      required:false
    }
  },


  exits: {
    badRequest: {
        description: 'Invalid data',
        //This one, as well as ´ok´ are always available
        responseType: 'badRequest'
    },
  },


  fn: async function (inputs, exits) {

    if(inputs.nom)
      inputs.nom = inputs.nom.toUpperCase();
    if(inputs.prenom)
      inputs.prenom = inputs.prenom.capitalize()
    if(!inputs.valid)
      inputs.valid=0;
    weep.spid.joueur_liste_spid(inputs)
      .then(resp=>{
        return exits.success(resp.data);
      })
      .catch(err=>{
        return exits.badRequest(err);
      });

  }


};
