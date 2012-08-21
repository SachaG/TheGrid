module.exports = {
    MONGO_URI: process.env.MONGOLAB_URI || 'mongodb://localhost/thegrid'
  , PORT: process.env.PORT || 3000
  , SESSION_SECRET: process.env.SESSION_SECRET || 'secret'
};
