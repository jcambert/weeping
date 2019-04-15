/**
 * PersonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  count:async function(req,res){

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

          if(err)
            return res.serverError( err);
        sails.log.info('count',err,count);
        return res.ok({count:count});
      })*/
  }

};

