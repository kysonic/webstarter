var mongoose = require('../libs/mongoose');
var rbacSchema = new mongoose.Schema({
        "name" : {type:String,unique:true},
        "roles": {"type": Array},
        "permissions": {"type": Object},
        "grants": {"type": Object},
        "created": {"type": Date, "default":Date.now
    }
});

exports.Rbac = mongoose.model('Rbac', rbacSchema);

