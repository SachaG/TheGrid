var queries = require('../queries');

var postList = function(query){
  return function(req, res, next){
    query(function(err, posts){
      if(err) return next(err);
      res.render('posts', {posts: posts});
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
