var assets = require('connect-assets')
  , CONFIG = require('./config')
  , express = require('express')
  , moment = require('moment')
  , MongoSession = require('connect-mongo')(express)
  , routes = require('./routes');

var app = express.createServer();
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});

  app.use(express.favicon());
  app.use(assets());
  app.use(express.static(__dirname + '/public'));

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
      secret: CONFIG.SESSION_SECRET
    , store: new MongoSession({url: CONFIG.MONGO_URI})
  }));

  app.use(app.router);
  app.use(express.errorHandler({
      dumpExceptions: true
    , showStack: true
  }));
});

app.helpers({
    moment: moment
  , error: null
});
app.dynamicHelpers({
  loggedIn: function(req){
    return req.session && req.session.username;
  }

  , url: function(req){
    var index = req.url.indexOf('?');
    return index === -1
      ? req.url
      : req.url.substring(0, index);
  }
});

routes(app);

app.listen(CONFIG.PORT, function(){
  console.log('The Grid is running on port %d.', CONFIG.PORT);
});
