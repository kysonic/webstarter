var router = require('express').Router();
module.exports = {
    routes: function(app) {
        router.get('/',this.index);
        return router;
    },
    index: function(req,res,next){
        res.render('pages/index',{title: 'Welcome to plex!'});
    }
};
