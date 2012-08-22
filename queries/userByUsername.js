var db = require('../db');

db.registerIndex('users', {username: 1});

module.exports = function(username, cb){
  if(!username || !username.length){
    return cb(null, null);
  }else{
    var query = {
      username: new RegExp('^' + username + '$', 'i')
    };
    db.users.findOne(query, cb);
  }
};
