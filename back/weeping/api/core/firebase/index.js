var admin = require('firebase-admin');
module.exports.db = admin.database();

module.exports.events ={
    created:"created",
    changed:"changed",
    deleted:"deleted"

}
