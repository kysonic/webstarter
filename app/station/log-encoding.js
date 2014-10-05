var favicon = require('static-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
module.exports = function(app){
    app.use(favicon());
    app.use(logger());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
}
