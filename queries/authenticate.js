var bcrypt = require('bcrypt')
  , userByUsername = require('./userByUsername');

module.exports = function(username, password, cb){
  if(!username) return cb('Invalid username or password.');

  userByUsername(username, function(err, user){
    if(err) return cb(err);
    else if(!user) return cb('Invalid username or password.');

    bcrypt.compare(password, user.password, function(err, valid){
      if(err || !valid)
        cb('Invalid username or password');
      else
        cb(null, user);
    });
  });
};
