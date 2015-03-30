var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var check = require('../libs/rbac');
module.exports = {
    routes: function() {
        // Direction routes
        router.get('/',check.can('read','user'),this.profileUser)
        router.post('/register',check.can('create','user'),this.registerUser);
        router.post('/auth',check.can('auth','user'),this.authUser);
        router.get('/logout',this.logOutUser);
        router.get('/profile',check.can('read','user'),this.profileUser)
        return router;
    },
    /**
     * User authentication
     */
    authUser: function(req,res) {
        var data = req.body;
        // If user is not auth
        if (!req.session.user) {
            // Find him
            User.findOne({email: data.email}, function (err, user) {
                if (err) return res.json({success: false, message: err.message});
                if (user) {
                    // Verify password
                    if (user.verify(data.password)) {
                        req.session.user = user.getAllowedProperties();
                        return res.json({success: true, message: 'Authorization success.', user: user.getAllowedProperties()});
                    } else {
                        return res.json({success: false, message: 'Login and Password is not match.'});
                    }
                } else {
                    return res.json({success: false, message: 'Authorization failure. User not defined.'});
                }
            });
        } else {
            return res.json({success: false, message: 'You are already auth.'});
        }
    },
    /**
     * Log Out - Delete a Session.
     */
    logOutUser: function(req,res,next){
        req.session.user = null;
        if(req.xhr) return res.json({success:true,message:'Logout is successful!'});
        next();
    },
    /**
     * Register User
     */
    registerUser: function(req,res){
        var data = req.body;
        // Check user email);
        User.findOne({email:data.email},function(err,user){
            if(err) return res.json({success:false,message:err.message});
            if(user) {
                return res.json({success:false,message:'You already register.'});
            }else {
                //Create new user
                var password = data.password;
                data.password = User.encrypt(password);
                var user = new User(data);
                // Setup basic roles
                user.setRole(rbac,'user',function(err,isSet){if(err) throw(err);});
                // Save other basic user fields
                user.save(function(err,user){
                    if(err) return res.json({success:false,message:err.message});
                    req.session.user = user.getAllowedProperties();
                    return res.json({success:true,message:'Registration successful.',user:user.getAllowedProperties()});
                });
            }
        });
    },
    profileUser: function(req,res,next) {
        var data = req.body;
        // If user is not auth
        console.log(req.session.user,!req.session.user)
        if (req.session.user) {
            User.findOne({email: req.session.user.email},function(err,user){
                res.render('pages/user',user.getAllowedProperties());
            });
        } else {
            return res.redirect(303,'/');
        }
    }
}
