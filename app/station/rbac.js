var rbac = require('rbac');
var mRbac = require('../models/rbac').Rbac;
/**
 * Get Rbac Schema.
 * @param app
 */
module.exports = function(app) {
    var config = app.get('config');
    if(!global.rbac) {
        mRbac.findOne({name: config.get('currentRbacSchema')},function(err,rbacSchema){
            if(err) throw err;
            global.rbac = new rbac(rbacSchema);
            global.rbacSchema = rbacSchema;
        });
    }
}