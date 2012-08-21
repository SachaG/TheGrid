var fs = require('fs')
  , blacklist = [
    'index.js'
  ];

var files = fs.readdirSync('./commands').filter(function(f){
  return blacklist.indexOf(f) === -1;
});

var middleware = {};
files.forEach(function(f){
  var name = f.substring(0, f.lastIndexOf('.'));
  middleware[name] = require('./' + f);
});

module.exports = middleware;
