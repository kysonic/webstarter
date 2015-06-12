var rbac = require('rbac');
var User  = require('../models/user').User;
exports.check = function(app) {
    return function(req,res,next){
        // Check DB
        if(req.session.user) {
            User.findOne({email:req.session.user.email},function(err,user){
                if(err) throw err;
                if(!user && req.session.user) {
                    delete req.session.user;
                }
                res.locals.isAuth = !!user;
                // User
                res.locals.user = user.getAllowedProperties();
                // Menu
                res.locals.menuTitle = (user.firstName && user.lastName) ? (user.firstName.replace(/^\s+|\s+$/i,'') +' '+user.lastName.replace(/^\s+|\s+$/i,'')) : '';
                next();
            });
        }else {
            next();
        }
    }
}