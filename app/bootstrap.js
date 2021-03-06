var config = require('./config');
var path = require('path');
module.exports = function(app){
    app.disable('view cache');
    app.disable('ETag');
    app.settings.env = 'dev';
    app.set('port', process.env.PORT || config.get('port'));
    app.set('config',config);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
}
