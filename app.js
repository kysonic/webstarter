var express = require('express');
var path = require('path');

var app = express();
/**
 * App global configuration
 */
require('./app/bootstrap')(app);

    
    /**
* Bem middleware
*/
app.use(require('plex-bem-middleware')(app));
    

/**
 * Static middleware
 */
app.use(express.static(path.join(__dirname, 'public')));
/**
 * Station
 */
require('./app/station/log-encoding')(app);
require('./app/station/cookie-session')(app);
require('./app/station/routes')(app);
require('./app/station/error')(app);

module.exports = app;