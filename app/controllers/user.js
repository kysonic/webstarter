var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
module.exports = {
    routes: function(app) {
        router.get('/:id',this.getUser);
        router.get('/',this.queryUser);
        router.post('/',this.postUser);
        router.put('/:id',this.putUser);
        router.delete('/:id',this.deleteUser);
        router.post('/auth',this.authUser);
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
            return res.json({success:true,message:'User getting successful.',user:user});
        });
    },
    /**
     * Query
     */
    queryUser: function(req,res){
        var query = req.query;
        User.find(query,function(err,user){
            if(err) return res.json({success:false,message:err.message});
            return res.json({success:true,message:'User getting successful.',user:user});
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
            return res.json({success:true,message:'User adding successful.',user:user});
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
            return res.json({success:true,message:'User updating successful.',user:user});
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
            User.find({email: data.email}, function (err, user) {
                if (err) return res.json({success: false, message: err.message});
                if (user[0]) {
                    var user = user[0];
                    // Verify password
                    if (user.verify(data.password)) {
                        req.session.user = {email: user.email, password: data.password};
                        return res.json({success: true, message: 'User is find.', user: user.getAllowedProperties()});
                    } else {
                        return res.json({success: false, message: 'Login/Password is not correctly.'});
                    }
                } else {
                    return res.json({success: false, message: 'User not found.'});
                }
            });
        } else {
            return res.json({success: false, message: 'You are already auth.'});
        }
    },
    logOutUser: function(req,res){
        req.session.user = null;
        return res.json({success:true,message:'Logout is successful!'});
    }
}
