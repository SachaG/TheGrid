var _ = require('underscore')
  , db = require('../db')
  , queries = require('../queries')
  , incrementCommentCount = require('./incrementCommentCount');

var getParentComment = function(childComment, cb){
  if(!childComment.parentCommentId)
    cb(null, null);
  else
    queries.commentById(childComment.parentCommentId, cb);
};

module.exports = function(comment, cb){
  var comment = _.defaults({
      _id: new db.ObjectId()
    , submitted: new Date()
    , votes: 0
    , comments: 0
  }, comment);

  // convert string IDs to ObjectIds
  if(typeof(comment.postId) === 'string')
    comment.postId = new db.ObjectId(comment.postId);
  if(comment.parentCommentId && typeof(comment.parentCommentId) === 'string')
    comment.parentCommentId = new db.ObjectId(comment.parentCommentId);

  getParentComment(comment, function(err, parent){
    if(err) return cb(err);

    // materialized path
    if(parent)
      comment.path = parent.path + comment._id.toString() + ',';
    else
      comment.path = ',';

    //TODO: add validation

    db.comments.insert(comment, function(err, comment){
      if(err) return cb(err);
      incrementCommentCount(comment.postId, cb);
    });
  });

};
