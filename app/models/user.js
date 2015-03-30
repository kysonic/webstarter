var mongoose = require('../libs/mongoose');
var passwordHash = require('password-hash');
var rbacPlugin = require('mongoose-hrbac');
//var autoIncPlugin = require("mongodb-autoincrement");
var schema = new mongoose.Schema({
    created:{type: Date,default: Date.now},
    email: {type: String,unique:true},
    password: String,
    firstName: String,
    lastName: String,
    birthDate: Date,
    motto: String,
    country: String,
    location: String,
    gender : { type: String, match: /(male|female)/ },
    about: String
});
/**
 * Connect rbac plugin
 */
schema.plugin(rbacPlugin);
/**
 * Connect auto-incriment plugin
 */
//schema.plugin(autoIncPlugin.mongoosePlugin);
/**
 * Allowed properties which can return on front-end
 * @type {string[]}
 */
schema.statics.allowedProperties = ['email','role'];
/**
 * Map user method
 * @param user
 * @returns {{}} - user with allowed fields
 */
schema.statics.map = function(user) {
    var allowedUser = {};
    User.allowedProperties.forEach(function(property){
        allowedUser[property] = user[property];
    }.bind(this));
    return allowedUser;
}
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

