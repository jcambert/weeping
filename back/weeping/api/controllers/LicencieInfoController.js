/**
 * LicencieInfoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    get:async function(req,res){
        var licence = req.param('licence');
        var info = await LicencieInfo.findOne({ licence: licence });
        if (!info)  return res.badRequest({error:'Numero de licencie inconnu'} );
        return res.ok(info);
    }

};

