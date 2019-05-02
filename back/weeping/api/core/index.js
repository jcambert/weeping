
var events = require('events');
var fs = require('fs');


String.prototype.capitalize = String.prototype.capitalize || 
function(){
    return this.charAt(0).toUpperCase() + this.slice(1)
}

var weep ={}
weep = new events.EventEmitter();
weep.send = function(eventname,...args){
    weep.emit(weep.name.concat(":",eventname),args);
}
weep.load = function(){
    return new Promise((resolve,reject)=>{
        sails.on('lifted', function() {
            // Your post-lift startup code here
            weep.info([weep.title,'Version:',weep.version,'ready'].join(' '));
             // weep is ready
            weep.send('ready');
         });
    
         try {
            var json = JSON.parse(fs.readFileSync('package.json'));
            weep.name = json.name;
            weep.title = json.title;
            weep.version = json.version;
            weep.description = json.description;
            weep.author = json.author;
            weep.info = (...args)=> {
                args.unshift(weep.name);
                sails.log.info(args.join(":"));
            }
            weep.debug =  (...args)=> {
                args.unshift(weep.name);
                sails.log.debug(args.join(":"));
            }
            weep.error =  (...args)=> {
                args.unshift(weep.name);
                sails.log.error(args.join(":"));
            }
            weep.warn =  (...args)=> {
                args.unshift(weep.name);
                sails.log.warn(args.join(":"));
            }
    
            
        } catch (e) {
            sails.log.warn('weeping:Cannot parse package.json');
        }

        var fb =require('./firebase/index.js');
       
        //console.log(sails.config.datastores.weeping);
        weep.db = fb.db;
        weep.debug(weep.db);

        weep.db.ref('weeping/person').on('child_added',snapshot=>{
            //console.log('a new value were inserted',snapshot.val());
            created=snapshot.val();
            sails.sockets.broadcast(weep.name,fb.events.created,created);
        })
        weep.spid=require("./fftt/index.js");

        // Weeping modules contains all public methods of hooks
        weep.modules = sails.hooks;
        return resolve();
    });
    
};

if (!String.prototype.format) {
   /* String.prototype.format = function() {
        var str = this.toString();
        if (!arguments.length)
            return str;
        var args = typeof arguments[0],
            args = (("string" == args || "number" == args) ? arguments : arguments[0]);
        for (arg in args)
            str = str.replace(RegExp("\\{" + arg + "\\}", "gi"), args[arg]);
        return str;
    }*/
    // First, checks if it isn't implemented yet.

    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
      });
    };
  
}

module.exports = weep;