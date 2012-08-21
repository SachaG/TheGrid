var async = require('async')
  , CONFIG = require('./config')
  , indexes = []
  , Mongolian = require('mongolian');

var db = new Mongolian(CONFIG.MONGO_URI);

module.exports = {
    users: db.collection('users')
  , posts: db.collection('posts')
  , comments: db.collection('comments')

  , ObjectId: Mongolian.ObjectId

  , registerIndex: function(collection, index, options){
    indexes.push({
        collection: collection
      , index: index
      , options: options
    });
  }
  , ensureIndexes: function(cb){
    async.forEach(indexes
                  , function(index, cb){
                    index.collection.ensureIndex(index.index, index.options, cb);
                  }
                  , function(err){
                    cb(err, indexes);
                  });
  }
};
