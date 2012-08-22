var db = require('../db');

module.exports = function(user, posts, cb){
  if(!user || !posts || !posts.length) return cb(null, []);

  var postIds = posts.map(function(p){
    return p._id;
  });
  var query = {
    userId: user._id
    , postId: {
      '$in': postIds
    }
  };

  db.myvotes.find(query).toArray(cb);
};
