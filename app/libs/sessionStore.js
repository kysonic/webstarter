var mongoose = require('./mongoose')
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

module.exports = new MongoStore({mongoose_connection:mongoose.connection});

