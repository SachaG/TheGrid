var commands = require('../commands')
  , queries = require('../queries');

module.exports = function(app){
  app.get('/signup', function(req, res, next){
    res.render('signup');
  });

  app.post('/signup', function(req, res, next){
    commands.signup(req.body.username, req.body.email, req.body.password, function(err, user){
      if(err){
        res.render('signup', {error: err});
      }else{
        req.session.username = user.username;
        req.session.email = user.email;
        res.redirect('/');
      }
    });
  });

  app.get('/login', function(req, res, next){
    res.render('login');
  });

  app.post('/login', function(req, res, next){
    queries.authenticate(req.body.username, req.body.password, function(err, user){
      if(err){
        res.render('login', {error: err});
      }else{
        req.session.username = user.username;
        req.session.email = user.email;
        res.redirect('/');
      }
    });
  });

  app.get('/logout', function(req, res, next){
    req.session.destroy();
    res.redirect('/login');
  });
}
