var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
module.exports = function(app) {
    /**
     * Read by id
     */
    router.get('/:id',function(req,res){
        var id = req.id;
        User.findOne({_id:id},function(err,user){
            if(err) return res.json({success:false,message:err.message});
            return res.json({success:true,message:'User getting succesfull...',user:user});
        });
    });
    /**
     * Query
     */
    router.get('/',function(req,res){
        var query = req.query;
        User.find(query,function(err,user){
            if(err) return res.json({success:false,message:err.message});
            return res.json({success:true,message:'User getting succesfull...',user:user});
        });
    });
    /**
     * Create
     */
    router.post('/',function(req,res){
        var data = req.body;
        var user = new User(data);
        user.save(function(err,user){
            if(err) return res.json({success:false,message:err.message});
            return res.json({success:true,message:'User adding successful...',user:user});
        });
    });
    /**
     * Update
     */
    router.put('/:id',function(req,res){
        var id = req.params.id;
        var data = req.body;
        User.findByIdAndUpdate(id,{$set:data},function(err,user){
            if(err) return res.json({success:false,message:err.message});
            return res.json({success:true,message:'User updating succesfull...',user:user});
        });
    });
    /**
     * Delete
     */
    router.delete('/:id',function(req,res){
        var id = req.params.id;
        User.remove({ _id: id }, function (err) {
            if (err)  return res.json({success:false,message:err.message});
            return res.json({success:true,message:'User deleting succesfull...'});
        });
    });
    /**
     * User authentication
     */
    router.post('/auth',function(req,res){
        var data = req.body;
        User.find({email:data.email},function(err,user){
            if(err) return res.json({success:false,message:err.message});
            var user = user[0];
            if(user.password ==data.password) {
                req.session.user = {email:user.email,password:user.password};
                return res.json({success:true,message:'User is find!'});
            }else {
                return res.json({success:false,message:'Login\Password is not correctly'});
            }
        });
    });
    /**
     * Logout route
     */
    router.get('/log/out',function(req,res){
        req.session.user = null;
        return res.json({success:true,message:'Logout is successful!'});
    });
    return router;
}
