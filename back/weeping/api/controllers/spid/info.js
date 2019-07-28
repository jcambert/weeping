module.exports = {


  friendlyName: 'Info',


  description: 'Info spid.',


  inputs: {
    api:{
      description:"Nom de l'api dont vous voulez les informations",
      type:'string',
      required:false
    }
  },


  exits: {
    invalid: {
      responseType: 'badRequest',
      description: 'le nom de l\'api n\'est pas une api SPID' ,
      
    },
  },


  fn: async function (inputs, exits) {
    result=[];
    if(!inputs.api){
      _.forEach(  _.filter(sails.getActions(),(a,n)=>{return n.startsWith("spid/")}) , (info,name)=>{
        if(info.toJSON){
          //sails.log.debug(info);
          action=info.toJSON();
          sails.log.debug(action)
          result.push({type:info. _middlewareType.replace('ACTION: spid/',''),friendlyName:action.friendlyName,description:action.description,inputs:action.inputs});
        }
      });
      return exits.success(result);
    }else{
      var action=sails.getActions()["spid/".concat(inputs.api)]
      if(!action  )
        return exits.invalid({error:'le nom de l\'api n\'est pas une api SPID'});
    
      var infos=action.toJSON();
      //sails.log.debug(JSON.stringify( infos ) );
      result.push({type:action. _middlewareType.replace('ACTION: spid/',''),friendlyName:infos.friendlyName,description:infos.description,inputs:infos.inputs});
      return exits.success(result);
    }
  }


};
