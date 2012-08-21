var db = require('../db');

module.exports = function(id, cb){
  var id = typeof(id) === 'string' ? new db.ObjectId(id) : id;
  var query = {
    _id: id
  };
  db.comments.findOne(query, cb);
};
