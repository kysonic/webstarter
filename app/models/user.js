var mongoose = require('../../libs/mongoose/index');

var schema = new mongoose.Schema({
    created:{type: Date,default: Date.now},
    email: String,
    password: String
});

exports.User = mongoose.model('User',schema);

