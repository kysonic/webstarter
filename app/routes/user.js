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
    return router;
}
