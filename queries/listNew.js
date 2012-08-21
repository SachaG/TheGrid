var db = require('../db');

module.exports = function(cb){
  db.posts.find({}).sort({ submitted: -1 }).toArray(cb);
};
