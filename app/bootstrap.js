var config = require('./config');
var path = require('path');
module.exports = function(app){
    app.settings.env = 'dev';
    app.set('port', process.env.PORT || config.get('port'));
    app.set('config',config);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.set('menu',[{name:'Home',href:'/'},{name:'Rest',href:'/rest'}]);
    app.set('tpl','default');
    app.set('useGulp','true');
    app.set('entityFolders',false);
}
