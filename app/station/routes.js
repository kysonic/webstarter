module.exports = function(app){               
    // Register routes
    app.use('/',require('../controllers/index').routes(app));
 	app.use('/user',require('../controllers/user').routes(app));
 }
