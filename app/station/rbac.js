var rbac = require('rbac');
var mRbac = require('../models/rbac').Rbac;
/**
 * Get Rbac Schema.
 * @param app
 */
module.exports = function(app) {
    var config = app.get('config');
    /*var rbac = new mRbac({
        name: 'webmatter',
        permissions : {
            user: ["create","read","update","delete","auth"]
        },
        grants: {
            guest: ["create_user","auth_user"],
            user: ["read_user",""]
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