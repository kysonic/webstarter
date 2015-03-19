var cookieParser = require('cookie-parser');
var session = require('express-session');
/**
 * Session and cookie middleware
 * @param app
 */
module.exports = function(app){
    var config = app.get('config');
    app.use(cookieParser());
    app.use(session({
        secret:  config.get('session:secret'),
        key: config.get('session:key'),
        cookie: config.get('session:cookie'),
        store: require('../libs/sessionStore')
    }));
}
