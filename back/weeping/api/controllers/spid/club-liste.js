module.exports = {


  friendlyName: 'Club liste',


  description: `Renvoie une liste de club pour soit:
    - un departement
    - un code postal
    - un nom de ville ou un nom de club
    - un n° de club
    `,


  inputs: {
    dep:{
      description:"numero du département recherché selon la codification de la table organisme",
      type:'number',
      required:false
    },
    code:{
      description:"Code postal",
      type:'number',
      required:false
    },
    ville:{
      description:"Nom de la commune du club ou nom du club",
      type:'string',
      required:false
    },
    numero:{
      description:"N° du club",
      type:'number',
      required:false
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    weep.spid.club_liste(inputs)
    .then(resp=>{
      return exits.success(resp.data);
    })
    .catch(err=>{
      return exits.badRequest(err);
    });
   

  }


};
