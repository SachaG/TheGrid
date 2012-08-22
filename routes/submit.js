var commands = require('../commands')
  , mw = require('../middleware');

module.exports = function(app){
  app.get('/submit', mw.auth, function(req, res, next){
    res.render('submit');
  });

  app.post('/submit', mw.auth, function(req, res, next){
    commands.createPost({
        headline: req.body.headline
      , url: req.body.url
      , body: req.body.body
      , submitter: req.session.username
    }, function(err, post){
      if(err){
        res.render('submit', {error: err});
      }else{
        res.redirect('/posts/' + post._id);
      }
    });
  });
};
