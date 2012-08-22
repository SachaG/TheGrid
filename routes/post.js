var commands = require('../commands')
  , mw = require('../middleware')
  , nest = require('../nest')
  , queries = require('../queries');

module.exports = function(app){
  app.get('/posts/:post_id', function(req, res, next){
    if(!req.post) return next(); //404

    queries.commentsByPost(req.post._id, function(err, comments){
      if(err) return next(err); //500

      var nestedComments = nest(comments, '_id', 'parentCommentId');
      res.render('post', {post: req.post, comments: nestedComments || []});
    });
  });

  app.post('/posts/:post_id/upvote', mw.auth, function(req, res, next){
    if(!req.post) return next(); //404

    commands.upvotePost(req.user, req.post, function(err){
      if(err) return res.next(err); //500
      res.send();
    });
  });

  app.get('/posts/:post_id/comments/:comment_id', mw.auth, function(req, res, next){
    if(!req.post) return next(); //404
    queries.commentById(req.param('comment_id'), function(err, comment){
      if(err) return next(err); //500
      if(!comment) return next(); //404
      if(comment.postId.toString() !== req.post._id.toString()) return next('wut'); //500: trying to read comment from wrong post

      res.render('reply', {post: req.post, comment: comment});
    });
  });

  app.post('/posts/:post_id/comments', mw.auth, function(req, res, next){
    if(!req.post) return next(); //404

    var comment = {
        comment: req.body.comment
      , submitter: req.session.username
      , postId: req.post._id
    };
    if(req.body.parentCommentId)
      comment.parentCommentId = req.body.parentCommentId;
    commands.createComment(comment, function(err){
      if(err){
        res.render('submit', {error: err});
      }else{
        res.redirect('/posts/' + req.post._id);
      }
    });
  });
};
