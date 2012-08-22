var db = require('../db');

module.exports = function(user, post, cb){
  var query = {
    _id: post._id
  };
  var update = {
    '$inc': {
      'votes': 1
    }
  };

  db.posts.findAndModify({
      query: query
    , update: update
  }, cb);
};
