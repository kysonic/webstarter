var rbac = require('rbac');
var User  = require('../models/user').User;
exports.check = function(app) {
    return function(req,res,next){
        // Check DB
        if(req.session.user) {
            User.findOne({email:req.session.user.email},function(err,user){
                if(err) throw err;
                res.locals.isAuth = !!user;
                next();
            });
        }else {
            next();
        }
    }
}