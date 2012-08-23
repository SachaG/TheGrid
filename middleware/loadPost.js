var queries = require('../queries');

module.exports = function(req, res, next, id){
  queries.postById(id, function(err, post){
    if(err) return next(err);
    req.post = post;
    next();
  });
};
