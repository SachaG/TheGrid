module.exports = function(app){
  require('./lists')(app);
  require('./post')(app);
  require('./auth')(app);
  require('./submit')(app);
};
