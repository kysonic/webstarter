var rbac = require('rbac');
var mRbac = require('../models/rbac').Rbac;
/**
 * Get Rbac Schema.
 * @param app
 */
module.exports = function(app) {
    var config = app.get('config');
    /*var rbac = new mRbac({
        name: 'webstarter',
        permissions : {
            user: ["create","read","update","delete","auth"],
            project: ["create","update","read","delete"]
        },
        grants: {
            guest: ["create_user","auth_user"],
            user: ["read_user","update_user","create_project","update_project"]
        },
        roles: ["user","guest"]
    });
    rbac.save();*/
    if(!global.rbac) {
        mRbac.findOne({name: config.get('currentRbacSchema')},function(err,rbacSchema){
            if(err) throw err;
            global.rbac = new rbac(rbacSchema);
            global.rbacSchema = rbacSchema;
        });
    }
}