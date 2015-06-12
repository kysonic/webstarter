var express = require('express');
var router = express.Router();
var Project = require('../models/project').Project;
var User = require('../models/user').User;
var check = require('../libs/rbac');
var img = require('../libs/img');
module.exports = {
    routes: function() {
        router.get('/',this.project);
        router.post('/',check.can('create','project'),this.upsertProject);
        router.post('/add/image',check.can('create','project'),this.addProjectImage);
        router.post('/add/doc',check.can('create','project'),this.addProjectDoc);
        router.post('/add/mockup',check.can('create','project'),this.addProjectMockup);
        return router;
    },
    /**
     * Projects page
     * @param req
     * @param res
     * @param next
     */
    project: function(req,res,next){
        res.locals.headerSubMenu = JSON.stringify([
            {link:'#infoScreen',title:'Information'},
            {link:'#manegmentScreen',title:'Management'},
            {link:'#discussionScreen',title:'Discussions'}
        ]);
        res.render('pages/project/',{title: 'Project'});
    },
    upsertProject: function(req,res,next) {
        var data = req.body;
        if(!req.xhr) res.json({success:false,message:'This request support only xhr.'})
        data.owner = req.session.user.email;
        Project.findOneAndUpdate({owner: data.owner,name:data.name}, data, {upsert: true},function(err){
            if(err) res.json({success:false,errors:err});
            res.json({success:true});
        });
    },
    /**
     * Add project image
     * @param req
     * @param res
     */
    addProjectImage: function(req,res) {
        img.upload(req,{
            maxSize:4 * 1024 * 1024,
            path:'./public/uploads/users/'+req.session.user.email+'/projects/',
            setTime:true,
            supportMimeTypes: ['image/jpg', 'image/jpeg', 'image/png']}).then(
            function(data){
                res.json({success:true,filePath:data.file.path})
            },function(err){
                res.json({success:false,errors:err});
            });
    },
    addProjectDoc: function(req,res) {
        img.upload(req,{
            maxSize: 8 * 1024 * 1024,
            path:'./public/uploads/users/'+req.session.user.email+'/docs/',
            setTime:false,
            supportMimeTypes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/msword']}).then(
            function(data){
                res.json({success:true,filePath:data.file.path})
            },function(err){
                res.json({success:false,errors:err});
            });
    },
    addProjectMockup: function(req,res) {
        img.upload(req,{
            maxSize: 8 * 1024 * 1024,
            path:'./public/uploads/users/'+req.session.user.email+'/mockups/',
            setTime:false,
            supportMimeTypes: ['image/jpg', 'image/jpeg', 'image/png']}).then(
            function(data){
                res.json({success:true,filePath:data.file.path})
            },function(err){
                res.json({success:false,errors:err});
            });
    }
};
