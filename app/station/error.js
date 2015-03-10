module.exports = function(app){
    /**
     * Catch 404
     */
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    /**
     * If dev mode then print error message
     */
    if (app.get('env') === 'dev') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('pages/error', {
                message: err.message,
                error: err,
                tpl:app.get('tpl')
            });
        });
    }
    /**
     * Default view
     */
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('pages/error', {
            message: err.message,
            error: {},
            tpl:app.get('tpl')
        });
    });
}