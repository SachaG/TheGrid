var db = require('../db');

module.exports = function(postId, cb){
  var id = typeof(postId) === 'string'
    ? db.ObjectId(postId)
    : postId;
  var query = {
    postId: id
  };
  db.comments.find(query).toArray(cb);
};
