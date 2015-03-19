module.exports = function(app) {
    /**
     * Get session flash, set in locals and delete him/
     */
    app.use(function(req, res, next){
        res.locals.flash = req.session.flash;
        delete req.session.flash;
        next();
    });
}