var WebError = require('web-error');

/**
 * Return middleware function for permission check
 * @param action - rbac action (like a create)
 * @param role - rbac role (like a admin)
 * @returns {Function} - Middleware
 */
exports.can = function(action,role) {
    return function(req, res, next) {
        var userRole = req.session.user ? req.session.user.role : 'guest';
        global.rbac.can(userRole,action,role,function(err,can){
            if(!can) {
                if(req.xhr) res.json({success:false,message:'Access denied.'});
                else res.redirect(303,'/');
            }else {
                next();
            }
        });
    };
};