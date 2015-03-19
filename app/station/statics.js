var express = require('express');
var favicon = require('static-favicon');
var path  = require('path');
/**
 * Handle the static files.
 * @param app
 */
module.exports = function(app) {
    app.use(express.static(path.join(__dirname,'../../', 'public')));
    app.use(favicon());
    // TODO: Create a static mapping
}