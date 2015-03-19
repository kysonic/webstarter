var indexController = require('../controllers/');
module.exports = function(app){
    // Register routes
    indexController.routes(app);
}
