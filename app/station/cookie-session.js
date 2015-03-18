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
    var acceptedPages = {
        'GET' : ['/','/user/log/out'],
        'POST': ['/user/auth','/user/register'],
        'PUT':[],
        'DELETE': []
    };
    app.use(function(req, res, next) {
        // User not found.
        res.locals.notAuth = req.session.user==undefined;
        console.log(res.locals.notAuth)
        if(!(acceptedPages[req.method].indexOf(req.url.replace(/\?.*/,''))!=-1 || req.session.user)) {
            res.redirect('/');
        }else {
            next();
        }
    });
}
