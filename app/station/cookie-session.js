var cookieParser = require('cookie-parser');
var session = require('express-session');
module.exports = function(app){
    app.use(cookieParser());
    app.use(session({
        secret: app.get('config').get('session:secret'),
        key:app.get('config').get('session:key'),
        cookie:app.get('config').get('session:cookie'),
        store: require('../../libs/sessionStore/index')
    }));
    /**
     * Catch not unauthorized requests. And draw home page for not auth
     */
    var acceptedPages = ['/user/auth'];
    app.use(function(req, res, next) {
        // User not found.
        if(!(acceptedPages.indexOf(req.url)!=-1 || req.session.user)) {
            res.status(200);
            res.render('pages/index', {notAuth: true});
        }else {
            next();
        }
    });
}
