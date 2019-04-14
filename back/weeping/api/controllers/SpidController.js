/**
 * SpidController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    get: (req,res)=>{
        var q=req.query;
        var api=q.api;
        delete q.api;
        weep.spid.request(api,q)
        .then(resp=>{
         // sails.log.info(resp);
          return res.ok(resp.data);
        })
        .catch(err=>{
          return res.badRequest(err);
        });
    }
};

