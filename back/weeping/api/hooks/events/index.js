/**
 * events hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineEventsHook(app) {

  return {

    /**
     * Runs when this Sails app loads/lifts.
     */
    initialize: async function(done) {

      app.after('hook:orm:loaded', () => {
        /*const events = {
          
          created: 'afterCreate',
          updated: 'afterUpdate',
          destroyed: 'afterDestroy'
        }*/

        var fb = require("../../core/firebase/index.js");
        var events = fb.events;
        //var events=require("../../core/events/index.js");
        // Loop through all models (model var is the model's name, not the actual object)
        for (const model of Object.keys(app.models)) {
          //sails.log.info("hook:events",app.models[model]);
          // Use the events map defined above to map an event to a model's lifecycle callback
          for (const event of Object.keys(events)) {
            // evt is in the format model:event, i.e. user:created
            const evt = `${model}:${event}`
            const method = events[event]
            
            // Start extending the models
            app.models[model]   // eslint-disable-line no-underscore-dangle
            // The _callbacks property contains all the functions that are to be called for each
            // particular lifecycle callback. This allows us to add more functionality to these
            // callbacks without ever touching existing functions defined on the models or
            // elsewhere. There is risk, however, because _callbacks appears to be internal property
            // of the model and thus could change with future versions of Waterline / Sails.
            ._callbacks[method] = setupEvent(app, evt);
            //.push(setupEvent(app, evt))
          }
<<<<<<< HEAD
         // sails.log.debug(app.models[model]);
=======
          //sails.log.debug("Hook for model "+model);
          //sails.log.debug(app.models[model]);
>>>>>>> 2371d0df73da537b254fe99e8cf4c9ae6b7281e0
        }
      });

      sails.log.info('hook:events  Custom Hook Initialized');
      return done();
    }

  };

};


/**
 * Closure representing a particular model:event relation
 *
 * @param     {Object}    emitter     The Sails.js app
 * @param     {String}    event       The event to be emitted
 * @return    {Function}              The actual function who will emit the event on the Sails app
 */
function setupEvent(emitter, event) {
  return function modelEvent(changes, done) {
    // Normalise... Some events emit an array of changed model objects so let's normalise everything
    // into an array and then loop through all of them and emit them one by one
    changes = changes instanceof Array ? changes : [changes]

    for (const change of changes) {
      //sails.log.info(event,change);
      emitter.emit(event, change);
      //sails.sockets.broadcast(weep.name,event,change);
    }

    return done();
  }
}