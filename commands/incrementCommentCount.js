var db = require('../db');

module.exports = function(postId, cb){
  var query = {_id: postId};
  var update = {'$inc': {comments: 1}};
  db.posts.findAndModify({query: query, update: update}, cb);
};
