var _ = require('underscore')
  , db = require('../db');

module.exports = function(post, cb){
  var post = _.defaults({
      submitted: new Date()
    , votes: 0
    , comments: 0
  }, post);

  //TODO: add validation

  db.posts.insert(post, cb);
};
