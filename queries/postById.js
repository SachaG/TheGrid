var db = require('../db');

module.exports = function(id, cb){
  var query = {
    _id: new db.ObjectId(id)
  };
  db.posts.findOne(query, cb);
};
