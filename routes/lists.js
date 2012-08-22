var _ = require('underscore')
  , queries = require('../queries');

var postList = function(query){
  return function(req, res, next){
    query(function(err, posts){
      if(err) return next(err); //500
      queries.myVotesByPosts(req.user, posts, function(err, myvotes){
        if(err) return next(err); //500
        myvotes.forEach(function(vote){
          var post = _.find(posts, function(p){ return p._id.toString() === vote.postId.toString(); });
          post.voted = true;
        });
        res.render('posts', {posts: posts});
      });
    });
  };
};

module.exports = function(app){
  app.get('/', postList(queries.listTop));
  app.get('/new', postList(queries.listNew));
  app.get('/ask', postList(queries.listAsk));
  app.get('/show', postList(queries.listShow));
  app.get('/jobs', postList(queries.listJobs));
};
