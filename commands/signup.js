var bcrypt = require('bcrypt')
  , db = require('../db')
  , queries = require('../queries');

module.exports = function(username, email, password, cb){
  if(!username || !username.length) return cb('You must provide a username.');
  if(!email || !email.length) return cb('You must provide an email address.');
  if(!password || !password.length) return cb('You must provide a password.');

  queries.userByUsername(username, function(err, user){
    if(err) return cb(err);
    else if(user) return cb('Username in use.');

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    db.users.insert({
        username: username
      , email: email
      , password: hash
      , created: new Date()
    }, function(err, user){
      if(err) return cb(err);
      cb(null, user);
    });
  });
};
