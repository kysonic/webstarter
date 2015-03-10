var express = require('express');
var path = require('path');

var app = express();
/**
 * App global configuration
 */
require('./app/bootstrap')(app);
/**
 * Parser. U need uncomment it if u want use plex-parser features. Don't forget reload your server
 */
app.use(require('plex-riot-parser')(app));
/**
 * Static middleware
 */
app.use(express.static(path.join(__dirname, 'public')));
/**
 * Station (Is a grouped middleware)
 */
require('./app/station/log-encoding')(app);
require('./app/station/cookie-session')(app);
require('./app/station/routes')(app);
require('./app/station/error')(app);

module.exports = app;