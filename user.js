var express = require('express');
var router = express.Router();
var User = require('app/models/user').User;
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
        // If user is not auth
        if(!req.session.user){
            // Find him
            User.find({email:data.email},function(err,user){
                if(err) return res.json({success:false,message:err.message});
                if(user[0]){
                    var user = user[0];
                    // Verify password
                    if(user.verify(data.password)) {
                        req.session.user = {email:user.email,password:data.password};
                        return res.json({success:true,message:'User is find.',user:user.getAllowedProperties()});
                    }else {
                        return res.json({success:false,message:'Login/Password is not correctly.'});
                    }
                }else {
                    return res.json({success:false,message:'User not found.'});
                }
            });
        }else {
            return res.json({success:false,message:'You are already auth.'});
        }
    });
    /**
     * Registration
     */
    router.post('/register',function(req,res){
        var data = req.body;
        // Check user email
        User.find({email:data.email},function(err,user){
            if(err) return res.json({success:false,message:err.message});
            if(user[0]) {
                return res.json({success:false,message:'You already register.'});
            }else {
                //Create new user
                var password = data.password;
                data.password = User.encrypt(password);
                var user = new User(data);
                user.save(function(err,user){
                    if(err) return res.json({success:false,message:err.message});
                    req.session.user = {email:user.email,password:password};
                    return res.json({success:true,message:'We are register a new user',user:user.getAllowedProperties()});
                });
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
