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
    about: String,
    skills: Array,
    educations: Array,
    employments: Array,
    works: Array
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
schema.statics.allowedProperties = ['email','role','firstName','lastName','birthDate','motto','country','location','gender','about','fullAvatar','croppedAvatar','website','skills','educations','employments','works'];
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
 * Get props by list
 * @param list {Array}
 */
schema.statics.getPropsByList = function(userFields,list) {
    var allowedUser = {};
    var properties = list || User.allowedProperties;
    properties.forEach(function(property){
        allowedUser[property] = userFields[property] ? userFields[property] : '';
    }.bind(this));
    return allowedUser;
}
/**
 * Get array with filtered values
 * @param userArray {Array} - User data object array
 * @param list {Array} - list of property
 * @returns {{}}
 */
schema.statics.filterUserArray = function(userArray,list) {
    var filteredArray = [];
    var properties = list || User.allowedProperties;
    userArray.forEach(function(user,key){
        filteredArray[key] = this.getPropsByList(user,list);
    }.bind(this));
    return filteredArray;
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
schema.methods.getAllowedProperties = function(properties){
    var allowedUser = {};
    var properties = properties || User.allowedProperties;
    properties.forEach(function(property){
        allowedUser[property] = this[property] ? this[property] : '';
    }.bind(this));
    return allowedUser;
};

schema.methods.mixin = function(data){
    for(var key in data) {
        var value = data[key];
        if(-1!==User.allowedProperties.indexOf(key)) {
             if(/Array/.test(schema.path(key).options.type))  {
                 try{value = JSON.parse(value);}catch(e){}
             }

             this[key] = value;
        }
    }
}

var User = mongoose.model('User',schema);

/* Validation */

//Email
User.schema.path('email').validate(function (value) {
    return /[a-zA-Z0-9]+(?:(\.|_)[A-Za-z0-9!#$%&'*+/=?^`{|}~-]+)*@(?!([a-zA-Z0-9]*\.[a-zA-Z0-9]*\.[a-zA-Z0-9]*\.))(?:[A-Za-z0-9](?:[a-zA-Z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/i.test(value);
}, 'Email Error.');
//Avatars
User.schema.path('fullAvatar').validate(function(value){
    return /(.*)\.(jpg|gif|png|svg|ttf)/i.test(value);
},'Avatar Error.');
User.schema.path('croppedAvatar').validate(function(value){
    return /(.*)\.(jpg|gif|png|svg|ttf)/i.test(value);
},'Avatar Error.');
// Profile
User.schema.path('firstName').validate(function(value){
    return /^[a-zA-Z0-9а-яА-Я- ]+$/i.test(value);
},'First name Error.');
User.schema.path('lastName').validate(function(value){
    return /^[a-zA-Z0-9а-яА-Я- ]+$/i.test(value);
},'Last name Error.');
User.schema.path('website').validate(function(value){
    return /^(http(s?)\:\/\/([\w]+\.){1}([\w]+\.?)|)$/i.test(value);
},'Website Error.');
User.schema.path('location').validate(function(value){
    return /^([a-zA-Z0-9а-яА-Я- ]+|)$/i.test(value);
},'Location Error.');
User.schema.path('country').validate(function(value){
    return /^([a-zA-Z0-9а-яА-Я- ]+|)$/i.test(value);
},'Country Error.');

exports.User = User;

