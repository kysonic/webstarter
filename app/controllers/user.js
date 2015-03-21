var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var check = require('../libs/rbac');
module.exports = {
    routes: function() {
        // Rest routes
        router.get('/',check.can('read','user'),this.queryUser);
        router.get('/:id',check.can('read','user'),this.getUser);
        router.post('/',check.can('create','user'),this.postUser);
        router.put('/:id',check.can('update','user'),this.putUser);
        router.delete('/:id',check.can('delete','user'),this.deleteUser);
        // Direction routes
        router.post('/register',check.can('create','user'),this.registerUser);
        router.post('/auth',check.can('auth','user'),this.authUser);
        router.get('/log/out',this.logOutUser);
        return router;
    },
    /**
     * Read by id
     */
    getUser: function(req,res){
        var id = req.id;
        User.findOne({_id:id},function(err,user){
            if(err) return res.json({success:false,message:err.message});
            else return res.json({success:true,message:'User getting successful.',user:user ? user.getAllowedProperties() : {}});
        });
    },
    /**
     * Query
     */
    queryUser: function(req,res){
        var query = req.query;
        User.find(query,function(err,user){
            if(err) return res.json({success:false,message:err.message});
            return res.json({success:true,message:'User getting successful.',user:user.map(User.map)});
        });
    },
    /**
     * Create
     */
    postUser: function(req,res){
        var data = req.body;
        var user = new User(data);
        user.save(function(err,user){
            if(err) return res.json({success:false,message:err.message});
            return res.json({success:true,message:'User adding successful.',user:user.getAllowedProperties()});
        });
    },
    /**
     * Update
     */
    putUser: function(req,res){
        var id = req.params.id;
        var data = req.body;
        User.findByIdAndUpdate(id,{$set:data},function(err,user){
            if(err) return res.json({success:false,message:err.message});
            return res.json({success:true,message:'User updating successful.',user:user.getAllowedProperties()});
        });
    },
    /**
     * Delete
     */
    deleteUser: function(req,res){
        var id = req.params.id;
        User.remove({ _id: id }, function (err) {
            if (err)  return res.json({success:false,message:err.message});
            return res.json({success:true,message:'User deleting successful.'});
        });
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
        User.find({email:data.email},function(err,user){
            if(err) return res.json({success:false,message:err.message});
            if(user[0]) {
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
    }
}
