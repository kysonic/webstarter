var mongoose = require('../../libs/mongoose/index');

var schema = new mongoose.Schema({
    created:{type: Date,default: Date.now},
    name: String
});

exports.User = mongoose.model('User',schema);

