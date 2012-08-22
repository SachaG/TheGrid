var db = require('../db');

var addVotingRecord = function(user, post, cb){
  var query = {
      userId: user._id
    , postId: post._id
  };
  var update = {
    '$set': {
      'voted': true
    }
  };

  db.myvotes.findAndModify({
      query: query
    , update: update
    , upsert: true
  }, cb);
};

var incrementPostVoteCount = function(post, cb){
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

module.exports = function(user, post, cb){
  addVotingRecord(user, post, function(err, record){
    if(err) return cb(err);
    if(record.voted) return cb(); // user has already voted for this post
    incrementPostVoteCount(post, cb);
  });
};
