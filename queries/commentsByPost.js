var db = require('../db');

module.exports = function(postId, cb){
  var query = {
    postId: new db.ObjectId(postId)
  };
  db.comments.find(query).toArray(cb);
};
