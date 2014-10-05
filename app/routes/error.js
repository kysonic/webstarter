var express = require('express');
var router = express.Router();
module.exports = function(app) {
    router.get('/', function(req, res) {
        res.render('pages/'+app.get('tpl')+'/error', { title: 'error', menu:app.get('menu'),tpl:app.get('tpl')});
    });
    return router;
}
