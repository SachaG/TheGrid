var comands = require('../commands')
  , mw = require('../middleware')
  , nest = require('../nest')
  , queries = require('../queries');

module.exports = function(app){
  app.get('/posts/:post_id', function(req, res, next){
    queries.postById(req.param('post_id'), function(err, post){
      if(err) return next(err);
      if(!post) return next();
      queries.commentsByPost(req.param('post_id'), function(err, comments){
        if(err) return next(err);

        var nestedComments = nest(comments, '_id', 'parentCommentId');
        res.render('post', {post: post, comments: nestedComments || []});
      });
    });
  });

  app.get('/posts/:post_id/comments/:comment_id', mw.auth, function(req, res, next){
    queries.postById(req.param('post_id'), function(err, post){
      if(err) return next(err);
      if(!post) return next();
      queries.commentById(req.param('comment_id'), function(err, comment){
        if(err) return next(err);
        if(!comment) return next();
        if(comment.postId.toString() !== post._id.toString()) return next('wut');
        res.render('reply', {post: post, comment: comment});
      });
    });
  });

  app.post('/posts/:post_id/comments', mw.auth, function(req, res, next){
    var comment = {
        comment: req.body.comment
      , submitter: req.session.username
      , postId: req.param('post_id')
    };
    if(req.body.parentCommentId)
      comment.parentCommentId = req.body.parentCommentId;
    commands.createComment(comment, function(err){
      if(err){
        res.render('submit', {error: err});
      }else{
        res.redirect('/posts/' + req.param('post_id'));
      }
    });
  });
};
