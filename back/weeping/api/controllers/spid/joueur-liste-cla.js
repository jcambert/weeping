module.exports = {


  friendlyName: 'Joueur liste cla',


  description: 'Renvoie une liste des joueurs provenant de la base classement',


  inputs: {
    club:{
      description:"Numero du club (optionnel)",
      type:'string',
      required:false
    },
    nom:{
      description:"Nom du joueur (optionnel)",
      type:'string',
      required:false
    },
    prenom:{
      description:"Prénom du joueur",
      type:'string',
      required:false
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    if(inputs.nom)
      inputs.nom = inputs.nom.toUpperCase();
    weep.spid.joueur_liste_cla(inputs)
    .then(resp=>{
      return exits.success(resp.data);
    })
    .catch(err=>{
      return exits.badRequest(err);
    });

  }


};
