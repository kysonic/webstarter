var mongoose = require('../libs/mongoose');
var passwordHash = require('password-hash');
var rbacPlugin = require('mongoose-hrbac');
//var autoIncPlugin = require("mongodb-autoincrement");
var schema = new mongoose.Schema({
    created:{type: Date,default: Date.now},
    email: {type: String,unique:true,index:true},
    password: String,
    firstName: String,
    lastName: String,
    birthDate: Date,
    motto: String,
    country: String,
    location: String,
    website: String,
    gender : { type: String, match: /(male|female)/ },
    fullAvatar: String,
    croppedAvatar: String,
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
schema.statics.allowedProperties = ['email','role','firstName','lastName','birthDate','motto','country','location','gender','about','fullAvatar','croppedAvatar'];
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

//Email
User.schema.path('email').validate(function (value) {
    return /[a-zA-Z0-9]+(?:(\.|_)[A-Za-z0-9!#$%&'*+/=?^`{|}~-]+)*@(?!([a-zA-Z0-9]*\.[a-zA-Z0-9]*\.[a-zA-Z0-9]*\.))(?:[A-Za-z0-9](?:[a-zA-Z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/i.test(value);
}, 'Email Error');
//Avatars
User.schema.path('fullAvatar').validate(function(value){
    return /(.*)\.(jpg|gif|png|svg|ttf)/i.test(value);
},'Avatar Error');

User.schema.path('croppedAvatar').validate(function(value){
    return /(.*)\.(jpg|gif|png|svg|ttf)/i.test(value);
},'Avatar Error');

exports.User = User;

