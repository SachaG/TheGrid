var queries = require('../queries');

module.exports = function(req, res, next){
  if(req.user){
    next();
  }else{
    res.redirect('/login');
  }
};
