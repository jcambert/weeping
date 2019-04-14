/**
 * PersonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  count:async function(req,res){
<<<<<<< HEAD
     /* weep.spid.auth();*/
      /*sails.log.debug(weep.spid.baseurl);
      sails.log.debug(weep.spid.url("club_departement"));
      return res.ok();*/
      weep.spid.request("club_liste",{dep:"90"})
        .then(resp=>{
         // sails.log.info(resp);
          return res.ok(resp.data);
        })
        .catch(err=>{
          return res.badRequest(err);
        });
     
      /*
      Person.count({where:{nom:'amberti'}}).exec( (err,count)=>{
=======
      //sails.log.debug(this);
      //sails.log.debug(req);
      var ds=sails.getDatastore("weeping");
      sails.log.debug(ds);
      Person.count({where:{nom:'ambert'}}).exec( (err,count)=>{
>>>>>>> 2371d0df73da537b254fe99e8cf4c9ae6b7281e0
          if(err)
            return res.serverError( err);
        sails.log.info('count',err,count);
        return res.ok({count:count});
      })*/
  }

};

