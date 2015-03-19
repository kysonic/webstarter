var mongoose = require('../../libs/mongoose');
var passwordHash = require('password-hash');

var schema = new mongoose.Schema({
    created:{type: Date,default: Date.now},
    email: String,
    password: String
});
/**
 * Allowed properties which can return on front-end
 * @type {string[]}
 */
schema.statics.allowedProperties = ['email'];
/**
 * Static encrypt method
 * @param str
 * @returns {*}
 */
schema.statics.encrypt = function (str) {
    return passwordHash.generate(str);
}
/**
 * Static verify method
 * @param str
 * @returns {*}
 */
schema.methods.verify = function (str) {
    return passwordHash.verify(str, this.password);
}
/**
 * Get user object allowed property.
 * @returns {*}
 */
schema.methods.getAllowedProperties = function(){
    var allowedUser = {};
    User.allowedProperties.forEach(function(property){
        allowedUser[property] = this[property];
    }.bind(this));
    return allowedUser;
};

var User = mongoose.model('User',schema);

/* Validation */
User.schema.path('email').validate(function (value) {
    return /[a-zA-Z0-9]+(?:(\.|_)[A-Za-z0-9!#$%&'*+/=?^`{|}~-]+)*@(?!([a-zA-Z0-9]*\.[a-zA-Z0-9]*\.[a-zA-Z0-9]*\.))(?:[A-Za-z0-9](?:[a-zA-Z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/i.test(value);
}, 'Email Error');

exports.User = User;

