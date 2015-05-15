module.exports = function(app){    
    // Checkout authorization
    app.use(require('../libs/auth').check(app));
    // Router group
    app.use('/',require('../controllers/index').routes(app));
 	app.use('/user',require('../controllers/user').routes(app));
 	app.use('/project',require('../controllers/project').routes(app));
 }
