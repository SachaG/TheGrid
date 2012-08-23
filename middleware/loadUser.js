var queries = require('../queries');

module.exports = function(req, res, next){
  if(req.session.username){
    queries.userByUsername(req.session.username, function(err, user){
      if(err) return next(err); //500
      req.user = user;
      next();
    });
  }else{
    next();
  }
};
