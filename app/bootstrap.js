var config = require('./config');
var path = require('path');
module.exports = function(app){
    app.settings.env = 'dev';
    app.set('port', process.env.PORT || config.get('port'));
    app.set('config',config);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.set('stylesheets','.styl');
    app.set('riotCompiler','{jade,es6,styl}');
    app.set('componentPath','./public/app-components');
    app.set('tech','riot');
}
