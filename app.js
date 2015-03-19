var express = require('express');
var path = require('path');

var app = express();
/**
 * App global configuration
 */
require('./app/bootstrap')(app);
/**
 * Stations (Is a grouped middleware)
 */
require('./app/station/statics')(app);
require('./app/station/domainErrorHandler')(app);
require('./app/station/log')(app);
require('./app/station/parser')(app);
require('./app/station/cookie-session')(app);
require('./app/station/flash')(app);
require('./app/station/qa')(app);
require('./app/station/routes')(app);
require('./app/station/error')(app);

module.exports = app;