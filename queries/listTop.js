var db = require('../db');

module.exports = function(cb){
  //TODO: implement Hotness/rating based on voting and other factors
  db.posts.find({}).sort({ submitted: -1 }).toArray(cb);
};
