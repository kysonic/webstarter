var cookieParser = require('cookie-parser');
var session = require('express-session');
module.exports = function(app){
    app.use(cookieParser());
    app.use(session({
        secret: app.get('config').get('session:secret'),
        key:app.get('config').get('session:key'),
        cookie:app.get('config').get('session:cookie'),
        store: require('../../libs/sessionStore')
    }));
}
