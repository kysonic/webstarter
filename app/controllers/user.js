var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var check = require('../libs/rbac');
var img = require('../libs/img');
var countries  = require('country-data').countries;
var fs = require('fs');
module.exports = {
    routes: function(app) {
        // Direction routes
        router.get('/',check.can('read','user'),this.profileUser);
        router.get('/data',check.can('read','user'),this.getData);
        router.post('/search',check.can('read','user'),this.search);
        router.post('/',check.can('update','user'),this.updateProfile);
        router.post('/register',check.can('create','user'),this.registerUser);
        router.post('/auth',check.can('auth','user'),this.authUser);
        router.get('/logout',this.logOutUser);
        router.get('/profile',check.can('read','user'),this.profileUser);
        router.post('/upload-avatar',check.can('update','user'),this.uploadAvatar);
        router.post('/add-work-image',check.can('update','user'),this.addWorkImage);
        router.post('/crop-avatar',check.can('update','user'),this.avatarCrop);
        router.post('/crop-work-image',check.can('update','user'),this.cropWorkImage);
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
    /**
     * User profile page
     * @returns {*|Server}
     */
    profileUser: function(req,res,next) {
        //Header
        res.locals.activeHeaderMenuItem = 0;
        // XXX: CONTROL SUB MENU
        res.locals.headerSubMenu = JSON.stringify([{link:'#profileScreen',title:'Profile'},
                                                   {link:'#freelancerScreen',title:'Resume'},
                                                   {link:'#portfolioScreen',title:'Portfolio'},
                                                   {link:'#notifyScreen',title:'Notification'},
                                                   {link:'#notifyScreen',title:'Privacy&Pay'}
                                                   ]);
        // Countries
        var cntrs = [];
        countries.all.forEach(function(country){cntrs.push(country.name);});
        res.locals.countries = JSON.stringify(cntrs);
        // Render view. Remember! We get all of user data in /lib/auth.js during the authentication
        res.render('pages/user/');
    },
    /**
     * Get User Allowed Data
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    getData: function(req,res,next) {
        if(!req.fresh) res.set("Cache-Control", "no-cache, no-store, must-revalidate");
        if (req.session.user && req.xhr) {
            res.json({success:true,data:res.locals.user});
        } else {
            return res.json({success: false});
        }
    },
    /**
     * Update user data
     */
    updateProfile: function(req,res,next) {
        var data = req.body;
        if(!req.session.user || !req.xhr || !data) req.json({success:false,errors:['You are not authorized.']});
        User.findOne({email: req.session.user.email},function(err,user){
            if(err) return res.json({success:false,errors:err});
            else {
                user.mixin(data);
                if(data.works) img.removeUnusedWorkImage('./public/uploads/users/'+req.session.user.email+'/works/',data.works);
                user.save(function(err){
                    if(err) return res.json({success:false,errors: err.errors});
                    res.json({success:true});
                });
            }
        }.bind(this));
    },
    /**
     * Upload avatar
     */
    uploadAvatar: function(req,res,next) {
        //Img lib help us
        if(!fs.existsSync('./public/uploads/users/'+req.session.user.email)) fs.mkdir('./public/uploads/users/'+req.session.user.email);
        img.upload(req,{
                        name: 'full',
                        setTime:true,
                        maxSize:2 * 1024 * 1024,
                        path:'./public/uploads/users/'+req.session.user.email+'/avatars/',
                        supportMimeTypes: ['image/jpg', 'image/jpeg', 'image/png']}).then(function(data){
            User.update({email:req.session.user.email}, { $set: { fullAvatar: data.file.path }}, function(err){
                if(err) res.json({success:false,errors:err});
                else {
                    req.session.imageUpdate = true;
                    res.json({success:true,file:data.file});
                }
            });
        },function(err){
            res.json({success:false,errors:err});
        });
    },
    /**
     * Add work image
     * @param req
     * @param res
     */
    addWorkImage: function(req,res) {
        img.upload(req,{maxSize:4 * 1024 * 1024,
            path:'./public/uploads/users/'+req.session.user.email+'/works/',
            setTime:true,
            supportMimeTypes: ['image/jpg', 'image/jpeg', 'image/png']}).then(
            function(data){
                res.json({success:true,filePath:data.file.path})
            },function(err){
                res.json({success:false,errors:err});
            });
    },
    /**
     * Crop
     */
    avatarCrop: function(req,res,next){
        var data = req.body;
        if(!req.xhr) next();
        img.crop({pth:data.pth,crop:data.crop,resize:{w:320,h:320},name:'cropped.jpg',setTime:true}).then(function(src){
            User.update({email:req.session.user.email}, { $set: { croppedAvatar: src}}, function(err,updated){
                if(err) res.json({success:false,errors:err});
                else res.json({success:true,src:src});
            });
        },function(err){
            res.json({success:false,errors:err});
        });
    },
    /**
     * Crop Work Image Action
     * @param req
     * @param res
     * @param next
     */
    cropWorkImage: function(req,res,next){
        var data = req.body;
        if(!req.xhr) next();
        img.crop({pth:data.pth,crop:data.crop,resize:{w:data.crop.width,h:data.crop.height},setTime:true}).then(function(src){
            res.json({success:true,src:src});
        },function(err){
            res.json({success:false,errors:err});
        });
    },
    /**
     *
     * @param query
     */
    search: function(req,res,next){
        var data = req.body;
        var query = data.query.replace(/(^\s*|\s*$)/g,'');
        var searchRegexp = query ? new RegExp('.*'+query+'.*','ig') : '';
        User.find({$or:[{email:searchRegexp},{firstName:searchRegexp},{lastName:searchRegexp}]},function(err,users){
            if(err) res.json({success:false,error:err});
            res.json({success:true,users:User.filterUserArray(users,['email','croppedAvatar','firstName','lastName'])});
        })
    }
}
