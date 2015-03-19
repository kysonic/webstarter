module.exports = {
    routes: function(app) {
        app.get('/',this.home);
    },
    home: function(req,res,next){
        res.render('pages/index',{title: 'Welcome to plex!'});
    }
};
